import { router } from "../../trpc";
import { eventsRouter } from "./events";
import { usersRouter } from "../routes/users";

export const appRouter = router({
  events: eventsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
