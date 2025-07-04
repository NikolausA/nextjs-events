import { publicProcedure, router } from "../../trpc";
import { prisma } from "../../prisma_db";

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),
});
