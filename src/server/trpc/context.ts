import { prisma } from "@/server/prisma_db";
import { getCurrentUserFromSession } from "@/shared/lib/auth/get-current-user";

export async function createTRPCContext() {
  const user = await getCurrentUserFromSession();

  return {
    prisma,
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
