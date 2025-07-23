"use client";

import { trpc } from "@/shared/api/trpc";

type JoinEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const JoinEventButton = ({
  eventId,
  onSuccess,
}: JoinEventButtonProps) => {
  const { mutate, isPending } = trpc.events.join.useMutation({
    onSuccess: () => {
      console.log("Successfully joined event!");
      onSuccess?.();
    },
    onError: (err) => {
      console.error("Failed to join event:", err.message);
    },
  });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      disabled={isPending}
      className="h-10 px-6 font-semibold rounded-md bg-black text-white disabled:opacity-50"
      onClick={handleClick}
    >
      {isPending ? "..." : "Присоединиться"}
    </button>
  );
};
