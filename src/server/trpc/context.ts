import { getToken } from "next-auth/jwt";
import { prisma } from "@/server/prisma_db";

type CreateContextOptions = {
  req: Request;
};

export async function createTRPCContext({ req }: CreateContextOptions) {
  try {
    const token = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("[tRPC Context] Token:", token ? "✅ Найден" : "❌ Не найден");

    const userId = token?.sub ? Number(token.sub) : null;

    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
      console.log(
        "[tRPC Context] User from DB:",
        user ? "✅ Найден" : "❌ Не найден"
      );
    } else {
      console.log("[tRPC Context] No userId found in token.");
    }

    return {
      prisma,
      user,
    };
  } catch (error) {
    console.error("[tRPC Context] Ошибка при создании контекста:", error);
    return {
      prisma,
      user: null,
    };
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
