"use client";

import UpdateProfileProperty from "../../(settings)/UpdateProfileProperty";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { z } from "zod";
import {
  nameSchema,
  optionalString,
  mdTextSchema,
} from "@/lib/zod-schemas";
import FormError from "@/components/ui/FormError";
import { useEffect } from "react";
import SubmitButton from "@/components/ui/buttons/SubmitButton";
import AvatarForm from "../../(settings)/AvatarForm";
import { toast } from "sonner";
import SettingsLayout from "../../(settings)/SettingsLayout";

export default function ProfileSettings({ token }: { token: string }) {
  const { push } = useRouter();
  const params = useSearchParams();
  const userId = params.get("user");
  if (!userId) push("/profile");
  const updateUserSchema = z.object({
    lastName: nameSchema,
    firstName: nameSchema,
    middleName: optionalString(nameSchema),
    description: optionalString(mdTextSchema),
  });
  const { errors, formError, formSuccess, handleSubmit, register, onSubmit } =
    useFormHandler({
      apiPath: "/api/User/update",
      token: token,
      method: "PUT",
      schema: updateUserSchema,
      resetSuccess: true,
      defaultValues: {
        lastName: params.get("last")!,
        firstName: params.get("first")!,
        middleName: params.get("middle")!,
        description: params.get("description")!,
      },
    });
  useEffect(() => {
    if (formSuccess)
      toast("Данные успешно сохранены!", {
        description: "Обновите страницу профиля, чтобы увидеть измения.",
      });
  }, [formSuccess]);
  return (
    <SettingsLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdateProfileProperty
          text="Введите ФИО"
          className="grid place-content-start gap-4"
        >
          <input
            {...register("lastName")}
            className="small-black"
            placeholder="Фамилия"
          />
          <FormError error={errors.lastName} />
          <input
            {...register("firstName")}
            className="small-black"
            placeholder="Имя"
          />
          <FormError error={errors.firstName} />
          <input
            {...register("middleName")}
            className="small-black"
            placeholder="Отчество"
          />
          <FormError error={errors.middleName} />
        </UpdateProfileProperty>
        <UpdateProfileProperty text="О себе" className="grid">
          <textarea
            {...register("description")}
            className="small-black scrollbar-none"
            placeholder="Напишите свои навыки"
          />
          <FormError error={errors.description} />
        </UpdateProfileProperty>
        <SubmitButton />
        {formError && <p className="text-red-500 pt-4">{formError}</p>}
      </form>
      <AvatarForm userId={userId as string} token={token} />
    </SettingsLayout>
  );
}
