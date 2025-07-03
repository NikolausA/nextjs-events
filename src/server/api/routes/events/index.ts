import { publicProcedure, router } from "@/server/trpc";
import { prisma } from "@/server/prisma_db";
import { createEventSchema, getEventByIdSchema } from "./schema";

export const eventsRouter = router({
  getAll: publicProcedure.query(() => {
    return prisma.event.findMany({
      include: {
        author: true,
        participations: true,
      },
    });
  }),

  getById: publicProcedure.input(getEventByIdSchema).query(({ input }) => {
    return prisma.event.findUnique({
      where: { id: input.id },
      include: {
        author: true,
        participations: true,
      },
    });
  }),

  create: publicProcedure
    .input(createEventSchema)
    .mutation(async ({ input }) => {
      return prisma.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: new Date(input.date),
          authorId: 1,
        },
      });
    }),
});

export type EventRouter = typeof eventsRouter;
