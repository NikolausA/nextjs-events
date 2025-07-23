"use client";

import { trpc } from "@/shared/api/trpc";

type ToggleParticipationButtonProps = {
  eventId: number;
  isJoined: boolean;
  onSuccess?: () => void;
};

export const ToggleParticipationButton = ({
  eventId,
  isJoined,
  onSuccess,
}: ToggleParticipationButtonProps) => {
  const joinMutation = trpc.events.join.useMutation({
    onSuccess: () => {
      console.log("Successfully joined event!");
      onSuccess?.();
    },
    onError: (err) => {
      console.error("Failed to join event:", err.message);
    },
  });

  const leaveMutation = trpc.events.leave.useMutation({
    onSuccess,
    onError: (err) => {
      console.error("Failed to leave:", err.message);
    },
  });

  const isPending = joinMutation.isPending || leaveMutation.isPending;

  const handleClick = () => {
    if (isJoined) {
      leaveMutation.mutate({ id: eventId });
    } else {
      joinMutation.mutate({ id: eventId });
    }
  };

  return (
    <button
      disabled={isPending}
      className={`h-10 px-6 font-semibold rounded-md bg-black text-white disabled:opacity-50 ${
        isJoined
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
      onClick={handleClick}
    >
      {isPending ? "..." : isJoined ? "Отписаться" : "Присоединиться"}
    </button>
  );
};
