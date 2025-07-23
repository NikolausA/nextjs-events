"use client";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { Logo } from "@/shared/assets/icons/Logo";
import { LoginButton } from "@/features/auth/ui/LoginButton";
import { UserActions } from "@/features/auth/ui/UserActions";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full px-6 py-4 border-b border-gray-300 flex justify-between items-center bg-white shadow-sm"
    >
      <Link href="/" className="flex items-center gap-2 hover:opacity-80">
        <Logo />
      </Link>
      {session?.user ? (
        <UserActions name={session.user.name ?? null} />
      ) : (
        <LoginButton />
      )}
    </header>
  );
};
