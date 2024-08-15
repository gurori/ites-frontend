"use client";

import DatePicker from "@/components/date-picker/DatePicker";
import BackButton from "@/components/ui/buttons/BackButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { dateSchema, lgTextSchema, priceSchema, smTextSchema } from "@/lib/zod-schemas";
import { SendHorizonalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useController } from "react-hook-form";
import { z } from "zod";

export default function OrderForm({
  token,
}: Readonly<{ token: string }>) {
  const { back } = useRouter();
  const orderSchema = z.object({
    title: smTextSchema,
    description: lgTextSchema,
    price: priceSchema,
    deadLine: dateSchema,
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
    schema: orderSchema,
    apiPath: "/api/orders",
    token: token,
    pushPath: "/profile/client",
  });
  const deadLineField = useController({ control, name: "deadLine" }).field;
  return (
    <div className="black-card my-8">
      <div className="flex gap-6 items-center">
        <BackButton onClick={() => back()} />
        <p className="text-white">Новый заказ</p>
      </div>
      <form className="pl-1 md:pl-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:w-[560px] pt-20">
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Заголовок:</p>
            <input
              className="rounded-gray"
              type="text"
              {...register("title")}
            />
          </label>
          <FormError error={errors.title} />
          <label className="space-y-2 md:flex md:justify-between">
            <p className="text-zinc-400">Описание:</p>
            <textarea className="rounded-gray" {...register("description")} />
          </label>
          <FormError error={errors.description} />
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Цена ₽:</p>
            <input
              className="rounded-gray arrows-hidden"
              type="number"
              {...register("price")}
            />
          </label>
          <FormError error={errors.price} />
          <label className="space-y-2 md:flex md:justify-between md:items-center">
            <p className="text-zinc-400">Дедлайн:</p>
            <DatePicker field={deadLineField} />
          </label>
          <FormError error={errors.deadLine} />
        </div>
        <button className="yellow-border mt-10 px-6 gap-4 flex items-center">
          Опубликовать <SendHorizonalIcon size={18} />
        </button>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </form>
    </div>
  );
}
