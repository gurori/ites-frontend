"use client";

import UpdateProfileProperty from "../../(settings)/UpdateProfileProperty";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { z } from "zod";
import {
  nameSchema,
  optionalString,
  roleSchema,
  mdTextSchema,
} from "@/lib/zod-schemas";
import FormError from "@/components/ui/FormError";
import { useEffect } from "react";
import SelectJobTitle from "./SelectRole";
import { useController } from "react-hook-form";
import { jobTitles } from "@/lib/constants";
import SubmitButton from "@/components/ui/buttons/SubmitButton";
import AvatarForm from "../../(settings)/AvatarForm";
import { toast } from "sonner";
import SettingsLayout from "../../(settings)/SettingsLayout";

const updateUserSchema = z.object({
  lastName: nameSchema,
  firstName: nameSchema,
  middleName: optionalString(nameSchema),
  description: optionalString(mdTextSchema),
  jobTitle: roleSchema,
});

export default function ProfileSettings({
  token,
}: Readonly<{ token: string }>) {
  const { replace } = useRouter();
  const params = useSearchParams();

  const currentJobTitle = params.get("job") ?? "";
  const userId = params.get("user");

  useEffect(() => {
    if (!userId) replace("/profile/member");
  }, [userId, replace]);

  const {
    formError,
    formSuccess,
    formState: { errors },
    handleSubmit,
    register,
    onSubmit,
    control,
  } = useFormHandler({
    schema: updateUserSchema,
    apiPath: "/api/user/update",
    token,
    method: "PUT",
    defaultValues: {
      lastName: params.get("last") ?? "",
      firstName: params.get("first") ?? "",
      middleName: params.get("middle") ?? "",
      description: params.get("description") ?? "",
      jobTitle: currentJobTitle,
    },
  });

  const { field } = useController({
    control,
    name: "jobTitle",
    defaultValue: currentJobTitle,
  });

  useEffect(() => {
    if (formSuccess) {
      toast.success("Данные успешно сохранены!", {
        description: "Обновите страницу профиля, чтобы увидеть изменения.",
      });
    }
  }, [formSuccess]);

  if (!userId) return null;

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

        <UpdateProfileProperty text="Выберите роль">
          <div className="flex gap-6 relative pb-4 flex-wrap">
            {jobTitles.map((title) => (
              <SelectJobTitle
                key={title}
                active={field.value === title}
                onClick={() => field.onChange(title)}
                title={title}
              />
            ))}
          </div>
          <FormError error={errors.jobTitle} />
        </UpdateProfileProperty>

        <SubmitButton />
        {formError && <p className="text-red-500 pt-4">{formError}</p>}
      </form>

      <AvatarForm userId={userId} token={token} />
    </SettingsLayout>
  );
}
