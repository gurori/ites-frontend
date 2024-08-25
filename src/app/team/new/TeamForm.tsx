"use client";

import BackButton from "@/components/ui/buttons/BackButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { lgTextSchema, smTextSchema } from "@/lib/zod-schemas";
import { SendHorizonalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function TeamForm({
  token,
}: Readonly<{ token: string }>) {
  const { back } = useRouter();
  const teamSchema = z.object({
    name: smTextSchema,
    description: lgTextSchema,
  });
  const {
    errors,
    formError,
    formSuccess,
    handleSubmit,
    onSubmit,
    register,
  } = useFormHandler({
    schema: teamSchema,
    apiPath: "/api/teams",
    token: token,
    pushPath: "/profile/member",
  });
  return (
    <div className="black-card my-8">
      <div className="flex gap-6 items-center">
        <BackButton onClick={() => back()} />
        <p className="text-white">Создайте команду</p>
      </div>
      <form className="pl-1 md:pl-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:w-[560px] pt-20">
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Заголовок:</p>
            <input
              className="rounded-gray"
              type="text"
              {...register("name")}
            />
          </label>
          <FormError error={errors.name} />
          <label className="space-y-2 md:flex md:justify-between">
            <p className="text-zinc-400">Описание:</p>
            <textarea className="rounded-gray" {...register("description")} />
          </label>
          <FormError error={errors.description} />
        </div>
        <button className="yellow-border mt-10 px-6 gap-4 flex items-center">
          Опубликовать <SendHorizonalIcon size={18} />
        </button>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </form>
    </div>
  );
}
