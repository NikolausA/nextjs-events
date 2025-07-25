// src/server/auth/getCurrentUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/authOptions";
import { prisma } from "@/server/prisma_db";

export async function getCurrentUserFromSession() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      // console.log("[getCurrentUserFromSession] No session found");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
    });

    // console.log("[getCurrentUserFromSession] User found:", user ? "✅" : "❌");
    return user;
  } catch (error) {
    console.error("[getCurrentUserFromSession] Error:", error);
    return null;
  }
}
