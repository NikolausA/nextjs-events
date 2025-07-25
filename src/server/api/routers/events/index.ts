import {
  publicProcedure,
  protectedProcedure,
  router,
} from "@/server/trpc/trpc";
import { prisma } from "@/server/prisma_db";
import { TRPCError } from "@trpc/server";
import {
  createEventSchema,
  getEventByIdSchema,
  eventSchema,
  updateSchema,
  JoinEventSchema,
} from "./schema";

export const eventsRouter = router({
  getAll: publicProcedure.query(async ({ ctx: { user } }) => {
    try {
      const events = await prisma.event.findMany({
        include: {
          author: true,
          participations: true,
        },
      });

      return events.map(({ participations, ...event }) => ({
        ...event,
        isJoined: participations.some(({ userId }) => userId === user?.id),
      }));
    } catch (error) {
      console.error("❌ Ошибка при получении событий:", error);
      throw error;
    }
  }),

  getById: protectedProcedure
    .input(getEventByIdSchema)
    .query(async ({ input }) => {
      const event = await prisma.event.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          title: true,
          description: true,
          date: true,
          authorId: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Event with id ${input.id} not found`,
        });
      }

      const parsed = eventSchema.safeParse(event);
      if (!parsed.success) {
        console.error("Zod parse error:", parsed.error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid data",
        });
      }
      return parsed.data;
    }),

  create: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ input, ctx }) => {
      return prisma.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: new Date(input.date),
          authorId: ctx.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      const event = await prisma.event.findUnique({ where: { id: input.id } });

      if (!event || event.authorId !== ctx.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return prisma.event.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          date: new Date(input.date),
        },
      });
    }),
  delete: protectedProcedure
    .input(getEventByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
      });

      if (!event) throw new TRPCError({ code: "NOT_FOUND" });

      if (event.authorId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Нет доступа" });
      }

      await ctx.prisma.event.delete({ where: { id: input.id } });

      return { success: true };
    }),

  join: protectedProcedure.input(JoinEventSchema).mutation(({ input, ctx }) => {
    return prisma.participation.create({
      data: {
        eventId: input.id,
        userId: ctx.user.id,
      },
    });
  }),
  leave: protectedProcedure
    .input(JoinEventSchema)
    .mutation(async ({ input, ctx }) => {
      await prisma.participation.deleteMany({
        where: {
          eventId: input.id,
          userId: ctx.user.id,
        },
      });
    }),
});

export type EventRouter = typeof eventsRouter;
