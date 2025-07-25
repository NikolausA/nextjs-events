"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

type Props = {
  name: string | null;
};

export const UserActions = ({ name }: Props) => (
  <div className="flex items-center gap-4">
    <span className="text-black">{name}</span>
    <Link
      href="/events/new"
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      Добавить событие
    </Link>
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="text-black hover:underline  cursor-pointer"
    >
      Выйти
    </button>
  </div>
);
