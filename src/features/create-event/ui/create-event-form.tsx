import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "@/server/api/routers/events/schema";
import { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;
type CreateEventFormProps = {
  isLoading: boolean;
  onSubmit: (data: FormData) => void;
};

export const CreateEventForm = ({
  onSubmit,
  isLoading,
}: CreateEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Название</label>
        <input
          {...register("title")}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Описание</label>
        <textarea
          {...register("description")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Дата</label>
        <input
          type="datetime-local"
          {...register("date")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.date && <p className="text-red-600">{errors.date.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {isLoading ? "Создание..." : "Создать"}
      </button>
    </form>
  );
};
