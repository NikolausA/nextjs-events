import { trpc } from "@/shared/api/api";

export const useEvents = () => {
  const all = trpc.events.getAll.useQuery();
  const byId = trpc.events.getById.useQuery;
  const create = trpc.events.create.useMutation();

  return { all, byId, create };
};
