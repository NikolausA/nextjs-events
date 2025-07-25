"use client";

import { EventList } from "@/features/event-list/ui/event-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 font-[family-name:var(--font-geist-sans)]">
      <EventList />
    </div>
  );
}
