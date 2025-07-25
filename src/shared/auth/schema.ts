import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Неверный email"),
  password: z.string().min(6, "Введите пароль"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
