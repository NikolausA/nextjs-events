import { z } from "zod";

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
});

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string().datetime(),
});

export const getEventByIdSchema = z.object({
  id: z.number(),
});
