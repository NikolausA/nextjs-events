"use client";

import { EventCard } from "@/entities/event/ui/event-card";
import { trpc } from "@/shared/api/trpc";
import { JoinEventButton } from "@/features/join-event/ui/button";

export const EventList = () => {
  const { data, isLoading, error, refetch } = trpc.events.getAll.useQuery();

  if (isLoading) {
    return <div className="text-center text-gray-500">Загрузка событий...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Ошибка загрузки: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400">
        События пока не добавлены.
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 px-4">
      {data?.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event?.description ?? "There is no description"}
          date={new Date(event.date)}
          action={
            !event.isJoined && (
              <JoinEventButton eventId={event.id} onSuccess={refetch} />
            )
          }
        />
      ))}
    </div>
  );
};
