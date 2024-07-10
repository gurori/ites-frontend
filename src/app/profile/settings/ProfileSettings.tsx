"use client";

import Link from "next/link";
import styles from "./Settings.module.css";
import { ChevronLeft, Pencil, PencilLine } from "lucide-react";
import UpdateProfileProperty from "./UpdateProfileProperty";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { z } from "zod";
import { nameSchema, textSchema } from "@/lib/zod-schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";

export default function ProfileSettings() {
  const params = useSearchParams();
  const { push } = useRouter();
  const updateUserSchema = z.object({
    lastName: nameSchema,
    firstName: nameSchema, 
    middleName: nameSchema,
    description: textSchema,
  });
  const { errors, formError, formSuccess, handleSubmit, onSubmit, register } =
    useFormHandler({
      apiPath: `https://localhost:52666/api/User/update/${params.get("id")}`,
      method: "PUT",
      schema: updateUserSchema,
      defaultValues: {
        lastName: params.get("lastName")!,
        firstName: params.get("firstName")!, 
        middleName: params.get("middleName")!,
        description: params.get("description")!,
      }
    });

  useEffect(() => {
    if (formSuccess) push("/profile");
  }, [formSuccess]);
  return (
    <main className={styles.main}>
      <div className="flex gap-6 items-center -ml-6">
        <Link href="/profile">
          <div className="bg-gray-400 size-[34px] rounded-full center">
            <ChevronLeft className="text-black -ml-0.5" />
          </div>
        </Link>
        <p className="text-white">Настроить профиль</p>
      </div>
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
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
          <input
            {...register("firstName")}
            className="small-black"
            placeholder="Имя"
          />
          {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
          <input
            {...register("middleName")}
            className="small-black"
            placeholder="Отчество"
          />
          {errors.middleName && (
            <ErrorMessage>{errors.middleName.message}</ErrorMessage>
          )}
        </UpdateProfileProperty>
        <UpdateProfileProperty text="О себе" className="grid">
          <textarea
            {...register("description")}
            className="small-black scrollbar-none"
            placeholder="Напишите свои навыки"
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </UpdateProfileProperty>
        {/* <UpdateProfileProperty text="Выберите роль">
        <input type="text" />
      </UpdateProfileProperty> */}
        {/* <UpdateProfileProperty text="Выберите аватарку" className="relative">
        <Image width={200} height={200} src="/icons/user.png" alt="avatar" />
        <div className="size-[38px] rounded-full bg-gray-500 center absolute bottom-4 left-40">
          <Pencil className="text-white" size={20} />
        </div>
      </UpdateProfileProperty> */}
        <button className="small bg-purple px-7 text-white flex items-center gap-4 mt-16">
          Редактировать <PencilLine size={16} />
        </button>
        <div className="pt-4">
          {formError && <p className="text-red-500">{formError}</p>}
          {formSuccess && <p className="text-green-500">Данные успешно сохранены!</p>}
        </div>
      </form>
    </main>
  );
}
