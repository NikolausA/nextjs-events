"use client";

import { trpc } from "@/shared/api/trpc";
import { useEffect } from "react";

export default function TestDate() {
  const { data, isLoading, error } = trpc.events.getAll.useQuery();

  useEffect(() => {
    if (data) {
      console.log("📦 Данные событий:", data);
      console.log("📅 Первый date:", data[0]?.date);
      console.log("📅 typeof date:", typeof data[0]?.date);
      console.log("📅 instanceof Date:", data[0]?.date instanceof Date);
    }
  }, [data]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return <div>Проверь консоль.</div>;
}
