import { publicProcedure, router } from "../../trpc";
import { prisma } from "../../prisma_db";

export const eventsRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.event.findMany();
  }),
});
