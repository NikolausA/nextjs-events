import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string().datetime(),
});

export const getEventByIdSchema = z.object({
  id: z.number(),
});
