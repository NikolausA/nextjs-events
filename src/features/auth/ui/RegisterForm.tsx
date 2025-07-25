"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/shared/api/trpc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterFormData } from "@/shared/auth/schema";

export const RegisterForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = trpc.user.register.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await mutateAsync(data);
      // сразу авторизуем:
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) router.push("/");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Имя</label>
        <input
          {...register("name")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block">Email</label>
        <input
          {...register("email")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block">Пароль</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {isPending ? "Регистрируем..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};
