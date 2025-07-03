"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/api/routes/index";

export const trpc = createTRPCReact<AppRouter>();
