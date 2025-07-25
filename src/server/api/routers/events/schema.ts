import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export const getEventByIdSchema = z.object({
  id: z.number(),
});

export const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),

  date: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date()
  ),
  authorId: z.number(),

  participations: z.array(
    z.object({
      user: z.object({
        name: z.string(),
      }),
    })
  ),
});

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const updateSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.union([z.string(), z.date()]),
});

export type Event = z.infer<typeof eventSchema>;
