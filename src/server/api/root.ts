import { router } from "../trpc/trpc";
import { eventsRouter } from "./routers/events";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  events: eventsRouter,
  user: authRouter,
});

export type AppRouter = typeof appRouter;
