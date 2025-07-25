"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/shared/api/trpc";
import { createEventSchema } from "@/server/api/routers/events/schema";
import { CreateEventForm } from "@/features/create-event/ui/create-event-form";
import { EventFormLayout } from "@/widgets/event-form-layout/ui/event-form-layout";
import { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;

export default function CreateEvent() {
  const router = useRouter();

  const { mutate, isPending } = trpc.events.create.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <EventFormLayout title="Создание события">
      <CreateEventForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitText="Создать"
      />
    </EventFormLayout>
  );
}
