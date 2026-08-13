"use client";

import { z } from "zod";
import { nameSchema, emailSchema, passwordSchema } from "@/lib/zod-schemas";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useState } from "react";
import IdentificationForm from "./(identification)/IdentificationForm";

const userSchema = z.object({
  firstName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type UserRegisterData = z.infer<typeof userSchema>;

export default function RegisterForm() {
  const [formData, setFormData] = useState<UserRegisterData | null>(null);
  const [activeStage, setActiveStage] = useState<"register" | "identification">(
    "register",
  );

  const {
    register,
    handleSubmit,
    formError,
    formState: { errors },
  } = useFormHandler<UserRegisterData>({
    schema: userSchema,
  });

  const onSubmit = (data: UserRegisterData) => {
    setFormData(data);
    setActiveStage("identification");
  };

  if (activeStage === "identification" && formData) {
    return <IdentificationForm formData={formData} />;
  }

  return (
    <div className="h-screen bg-purple center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 place-items-center"
      >
        <div className="text-center">
          {formError && (
            <ErrorMessage className="text-yellow-300">{formError}</ErrorMessage>
          )}
        </div>
        <div className="grid gap-1.5">
          <input
            {...register("firstName")}
            type="text"
            className="white drop-light"
            placeholder="Имя"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.firstName && errors.firstName.message}
          </ErrorMessage>
          <input
            {...register("email")}
            type="email"
            className="white drop-light"
            placeholder="Почта"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.email && errors.email.message}
          </ErrorMessage>
          <input
            {...register("password")}
            type="password"
            className="white drop-light"
            placeholder="Пароль"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.password && errors.password.message}
          </ErrorMessage>
        </div>
        <button className="large text-white bg-black">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
