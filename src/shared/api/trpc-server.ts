import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/trpc/context";

/**
 * Создает server-side tRPC caller для использования в Server Components,
 * Server Actions и других серверных контекстах Next.js App Router.
 *
 * Автоматически получает сессию пользователя через NextAuth.
 *
 * @example
 * ```typescript
 * const caller = await createCaller();
 * const user = await caller.user.getSessionUser();
 * const events = await caller.events.getAll();
 * ```
 */
export const createCaller = async () => {
  if (process.env.NODE_ENV === "development") {
    // console.log("[CreateCaller] Создание server-side tRPC caller");
  }

  try {
    // Создаем контекст с автоматическим получением сессии пользователя
    const context = await createTRPCContext();

    if (process.env.NODE_ENV === "development") {
      console.log(
        "[CreateCaller] Контекст создан, пользователь:",
        context.user ? `найден (ID: ${context.user.id})` : "не авторизован"
      );
    }

    return appRouter.createCaller(context);
  } catch (error) {
    console.error("[CreateCaller] Ошибка при создании caller:", error);
    throw new Error("Не удалось создать tRPC caller");
  }
};

/**
 * Тип для server-side tRPC caller
 */
export type ServerCaller = Awaited<ReturnType<typeof createCaller>>;
