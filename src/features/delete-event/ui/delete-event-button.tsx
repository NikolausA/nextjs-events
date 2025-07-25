"use client";

import { trpc } from "@/shared/api/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteEventButtonProps = {
  eventId: number;
};

export const DeleteEventButton = ({ eventId }: DeleteEventButtonProps) => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [confirming, setConfirming] = useState(false);

  const deleteMutation = trpc.events.delete.useMutation({
    onSuccess: () => {
      utils.events.invalidate();
      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      console.error("Ошибка при удалении события:", err.message);
      alert("Ошибка при удалении события");
      setConfirming(false);
    },
  });

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    try {
      await deleteMutation.mutateAsync({ id: eventId });
    } catch (error) {
      console.error("Ошибка в handleDelete:", error);
      setConfirming(false);
    }
  };

  return (
    <button
      disabled={deleteMutation.isPending}
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
    >
      {deleteMutation.isPending
        ? "Удаление..."
        : confirming
        ? "Подтвердить удаление"
        : "Удалить событие"}
    </button>
  );
};
