import { publicProcedure, router } from "@/server/api/trpc";
import { prisma } from "@/server/prisma_db";
import { createEventSchema, getEventByIdSchema } from "./schema";

export const eventsRouter = router({
  getAll: publicProcedure.query(async () => {
    try {
      const events = await prisma.event.findMany({
        include: {
          author: true,
          participations: true,
        },
      });

      return events;
    } catch (error) {
      console.error("❌ Ошибка при получении событий:", error);
      throw error;
    }
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
