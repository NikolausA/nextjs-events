import {
  protectedProcedure,
  publicProcedure,
  router,
} from "@/server/trpc/trpc";
import { hash } from "bcryptjs";
import { prisma } from "@/server/prisma_db";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const authRouter = router({
  getSessionUser: protectedProcedure.query(({ ctx }) => {
    if (!ctx.user) throw new Error("Unauthorized");

    return ctx.user;
  }),
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const existing = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) throw new Error("Пользователь уже существует");

      const hashed = await hash(input.password, 10);
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashed,
        },
      });

      return { success: true };
    }),
});
