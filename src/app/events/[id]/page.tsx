import { notFound } from "next/navigation";
import { createCaller } from "@/shared/api/trpc-server";
import { EventDetail } from "@/entities/event/ui/event-detail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id ?? NaN);
  if (isNaN(id)) return notFound();

  const caller = await createCaller();

  try {
    const [event, sessionUser] = await Promise.all([
      caller.events.getById({ id }),
      caller.user.getSessionUser(),
    ]);

    if (!event) return notFound();

    const isAuthor = sessionUser?.id === event.authorId;

    return <EventDetail {...event} isAuthor={isAuthor} />;
  } catch (error) {
    console.error("tRPC fetch error:", error);
    return <div>Не удалось загрузить событие</div>;
  }
}
