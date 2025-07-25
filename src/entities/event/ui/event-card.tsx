import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type EventCardProps = {
  id: number;
  title: string;
  description: string | null;
  date: Date;
  action: ReactNode;
};

export const EventCard = ({
  id,
  title,
  description,
  date,
  action,
}: EventCardProps) => {
  return (
    <div className="flex font-sans rounded-lg shadow-xl overflow-hidden">
      <div className="relative w-48 h-48 flex-none">
        <Image
          src="/poster.png"
          alt="event poster"
          className="object-cover rounded-l-lg"
          sizes="192px"
          fill
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap pt-6 pb-6">
          {" "}
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {title}
          </h1>
          <div className="text-lg font-semibold text-slate-500">
            {date.toLocaleDateString("ru-RU")}
          </div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {description ?? "There is no description"}
          </div>
        </div>
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            {action}
            <Link
              href={`/events/${id}`}
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
