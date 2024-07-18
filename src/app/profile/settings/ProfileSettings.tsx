"use client";

import { Pencil, PencilLine } from "lucide-react";
import UpdateProfileProperty from "./UpdateProfileProperty";
import { useSearchParams } from "next/navigation";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { z } from "zod";
import { nameSchema, textSchema } from "@/lib/zod-schemas";
import FormError from "@/components/ui/FormError";
import { useState } from "react";
import SelectJobTitle from "./SelectRole";
import { useController } from "react-hook-form";
import Image from "next/image";
import apiFetch from "@/lib/apiFetch";
import { jobTitles, randomGuid } from "@/lib/constants";
import SubmitButton from "@/components/ui/SubmitButton";
import AvatarForm from "./AvatarForm";

export default function ProfileSettings({ token }: { token: string }) {
  const params = useSearchParams();
  const currentJobTitle = params.get("jobTitle")!;
  const userId = params.get("userId") ?? randomGuid;
  const [activeJobTitle, setActiveJobTitle] = useState(currentJobTitle);
  const updateUserSchema = z.object({
    lastName: nameSchema,
    firstName: nameSchema,
    middleName: nameSchema,
    description: textSchema,
    jobTitle: z.string({ message: "Необходимо выбрать 1 роль" }),
  });
  const {
    errors,
    formError,
    formSuccess,
    handleSubmit,
    register,
    onSubmit,
    control,
  } = useFormHandler({
    pushPath: "/profile",
    apiPath: "/api/User/update",
    token: token,
    method: "PUT",
    schema: updateUserSchema,
    defaultValues: {
      lastName: params.get("lastName")!,
      firstName: params.get("firstName")!,
      middleName: params.get("middleName")!,
      description: params.get("description")!,
      jobTitle: currentJobTitle,
    },
    afterSubmitFunc: async (data) =>
      await apiFetch(`/api/Files/users/${userId}/avatar.jpg`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
          Authorization: `Bearer ${token}`,
        },
        body: data.avatar,
      }),
  });
  const { field } = useController({
    control,
    name: "jobTitle",
    defaultValue: currentJobTitle,
  });
  return (
    <>
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
          <div className="flex gap-6 relative pb-4">
            {jobTitles.map((title) => (
              <SelectJobTitle
              key={title}
                active={activeJobTitle === title}
                onClick={() => {
                  setActiveJobTitle(title);
                  field.onChange(title);
                }}
                title={title}
              />
            ))}
          </div>
          <FormError error={errors.jobTitle} />
        </UpdateProfileProperty>
        <SubmitButton />
        <div className="pt-4">
          {formError && <p className="text-red-500">{formError}</p>}
          {formSuccess && (
            <p className="text-green-500">Данные успешно сохранены!</p>
          )}
        </div>
      </form>
        <AvatarForm userId={userId} token={token} />
      
    </>
  );
}
