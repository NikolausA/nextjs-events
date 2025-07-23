import { createTRPCContext } from "@/server/trpc/context";
import { appRouter } from "@/server/api/root";

export const createCaller = async (req: Request) => {
  const context = await createTRPCContext({ req });
  return appRouter.createCaller(context);
};
