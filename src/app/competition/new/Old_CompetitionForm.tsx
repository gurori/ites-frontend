"use client";

import DatePicker from "@/components/date-picker/DatePicker";
import BackButton from "@/components/ui/buttons/BackButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { dateSchema, lgTextSchema, smTextSchema } from "@/lib/zod-schemas";
import { SendHorizonalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useController } from "react-hook-form";
import { z } from "zod";

export default function CompetitionForm({
  token,
}: Readonly<{ token: string }>) {
  const { back } = useRouter();
  const competitionSchema = z.object({
    title: smTextSchema,
    description: lgTextSchema,
    startDate: dateSchema,
    endDate: dateSchema,
  });
  const {
    control,
    errors,
    formError,
    formSuccess,
    handleSubmit,
    onSubmit,
    register,
  } = useFormHandler({
    schema: competitionSchema,
    apiPath: "/api/Competitions/create",
    token: token,
    pushPath: "/profile/organizer",
  });
  const startDateField = useController({ control, name: "startDate" }).field;
  const endDateField = useController({ control, name: "endDate" }).field;
  return (
    <div className="black-card my-8">
      <div className="flex gap-6 items-center">
        <BackButton onClick={() => back()} />
        <p className="text-white">Новый конкурс</p>
      </div>
      <form className="pl-1 md:pl-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:w-[560px] pt-20">
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Название:</p>
            <input
              className="rounded-gray"
              type="text"
              {...register("title")}
            />
          </label>
          <FormError error={errors.title} />
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Описание:</p>
            <textarea className="rounded-gray" {...register("description")} />
          </label>
          <FormError error={errors.description} />
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Дата проведения:</p>
            <DatePicker field={startDateField} />
          </label>
          <FormError error={errors.startDate} />
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Дата окончания:</p>
            <DatePicker
              field={endDateField}
              disabled={(d) => d <= new Date() || d < startDateField.value}
            />
          </label>
          <FormError error={errors.endDate} />
        </div>
        <button className="yellow-border mt-10 px-6 gap-4 flex items-center">
          Опубликовать <SendHorizonalIcon size={18} />
        </button>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </form>
    </div>
  );
}
