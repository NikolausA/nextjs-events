# 🗓️ Events Platform

Веб-приложения **Events** для создания, редактирования и участия в событиях. Проект реализован с использованием современных технологий фронтенда и бэкенда, построен по принципам модульности и использует архитектуру FSD (Feature-Sliced Design).

## 🚀 Демо

> 📌 _Запуск проекта производится локально. Приложение работает на порту `http://localhost:3000`._

---

## 🛠️ Стек технологий

**Frontend:**

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hook-form](https://react-hook-form.com/)
- [zod](https://zod.dev/) — валидация форм
- [next-auth](https://next-auth.js.org/) — аутентификация через CredentialsProvider

**Backend:**

- [tRPC v11](https://trpc.io/) — типобезопасный API
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/) — файл базы данных `prisma/dev.db`

**Прочее:**

- [SuperJSON](https://github.com/blitz-js/superjson) — сериализация даты и вложенных структур
- Архитектура: **FSD** (Feature-Sliced Design)
- Аутентификация через токены (JWT) и сессии

---

## 📦 Основной функционал

- 👤 Регистрация и вход по email/паролю (NextAuth)
- 🧭 Главная страница со списком событий
- ➕ Создание события (только для авторизованных пользователей)
- ✏️ Редактирование события (только для автора)
- ❌ Удаление события (только для автора)
- 📅 Присоединение и выход из события (по кнопке)
- ✅ Ограничения доступа на уровне tRPC middleware
- 🔐 Проверка `isAuthor` и `isJoined` для отображения UI-элементов
- ⏳ Загрузка и блокировка кнопок во время запросов
- ✅ Валидация форм через `react-hook-form` + `zodResolver`
