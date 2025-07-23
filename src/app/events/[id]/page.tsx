import { notFound } from "next/navigation";
import { createCaller } from "@/shared/api/trpc-server";
import { EventDetail } from "@/entities/event/ui/event-detail";
import { cookies } from "next/headers";

type PageProps = {
  params: { id: string };
};

export default async function EventPage({ params }: PageProps) {
  const id = Number(params?.id ?? NaN);
  if (isNaN(id)) return notFound();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const req = new Request("http://localhost/api/trpc", {
    headers: {
      cookie: cookieHeader,
    },
  });

  const caller = await createCaller(req);

  try {
    const event = await caller.events.getById({ id });

    if (!event) return notFound();

    return <EventDetail {...event} />;
  } catch (error) {
    console.error("tRPC fetch error:", error);
    return <div>Не удалось загрузить событие</div>;
  }
}
