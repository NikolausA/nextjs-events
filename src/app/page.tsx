// import Image from "next/image";
"use client";

import { EventList } from "@/features/event-list/ui/event-list";
// import TestDate from "@/features/test-date";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <EventList />
      {/* <TestDate /> */}
    </div>
  );
}
