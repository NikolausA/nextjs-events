import { EventCard } from "@/entities/event/ui/event-card";
import { useEvents } from "@/entities/event/model/api/events.api";

export const EventList = () => {
  const { all } = useEvents();

  if (all.isLoading) {
    return <div className="text-center text-gray-500">Загрузка событий...</div>;
  }

  if (all.error) {
    return (
      <div className="text-center text-red-500">
        Ошибка загрузки: {all.error.message}
      </div>
    );
  }

  if (!all.data || all.data.length === 0) {
    return (
      <div className="text-center text-gray-400">
        События пока не добавлены.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {all.data?.map((event) => (
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
