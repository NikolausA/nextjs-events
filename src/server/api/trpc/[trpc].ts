import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/api/routes";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
