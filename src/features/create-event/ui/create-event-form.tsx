import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "@/server/api/routers/events/schema";
import { z } from "zod";

type FormData = z.infer<typeof createEventSchema>;
type CreateEventFormProps = {
  isLoading: boolean;
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
  submitText?: string;
};

export const CreateEventForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  submitText = "Создать",
}: CreateEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Название</label>
        <input
          {...register("title")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Описание</label>
        <textarea
          {...register("description")}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium">Дата</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <input
              type="datetime-local"
              className="w-full border px-3 py-2 rounded"
              value={
                field.value
                  ? new Date(field.value).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          )}
        />

        {errors.date && <p className="text-red-600">{errors.date.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        {isLoading ? "Обработка..." : submitText}
      </button>
    </form>
  );
};
