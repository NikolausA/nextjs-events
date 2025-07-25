"use client";
import { signIn } from "next-auth/react";

export const LoginButton = () => (
  <button
    onClick={() => signIn()}
    className="text-black hover:underline cursor-pointer"
  >
    Войти
  </button>
);
