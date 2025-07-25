"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { loginSchema, LoginFormValues } from "@/shared/auth/schema";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      toast.error("Неверный email или пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? "Входим..." : "Войти"}
      </button>

      <Link
        href="/register"
        className="text-center text-sm text-blue-600 hover:underline"
      >
        Зарегистрироваться
      </Link>
    </form>
  );
};
