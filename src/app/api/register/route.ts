import { NextResponse } from "next/server";
import { prisma } from "@/server/prisma_db";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "User exists" }, { status: 400 });

  const hashed = await hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hashed } });

  return NextResponse.json({ ok: true });
}
