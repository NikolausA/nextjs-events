"use client";

import { CreateEventForm } from "@/features/create-event/ui/create-event-form";
import { trpc } from "@/shared/api/trpc";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { EventFormLayout } from "@/widgets/event-form-layout/ui/event-form-layout";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);

  const { data: event, isLoading: isFetching } = trpc.events.getById.useQuery({
    id: eventId,
  });
  const { mutate, isPending } = trpc.events.update.useMutation({
    onSuccess: () => router.push(`/events/${eventId}`),
  });

  if (isFetching || !event) return <p>Загрузка...</p>;

  return (
    <EventFormLayout title="Редактирование">
      <CreateEventForm
        isLoading={isPending}
        defaultValues={{
          title: event.title,
          description: event.description ?? "",
          date: new Date(event.date),
        }}
        onSubmit={(data) => mutate({ id: eventId, ...data })}
        submitText="Сохранить"
      />
    </EventFormLayout>
  );
}
