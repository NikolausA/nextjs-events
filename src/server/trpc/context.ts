import { prisma } from "@/server/prisma_db";
import { getCurrentUserFromSession } from "@/shared/lib/auth/get-current-user";

export async function createTRPCContext() {
  // Для server-side вызовов используем getServerSession
  const user = await getCurrentUserFromSession();

  // console.log("[Context] User:", user ? "✅ Найден" : "❌ Не найден");

  return {
    prisma,
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
