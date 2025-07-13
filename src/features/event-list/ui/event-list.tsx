"use client";

import { EventCard } from "@/entities/event/ui/event-card";
import { trpc } from "@/shared/api/trpc";

export const EventList = () => {
  const { data, isLoading, error } = trpc.events.getAll.useQuery();

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data?.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          date={new Date(event.date)}
          action={null}
        />
      ))}
    </div>
  );
};
