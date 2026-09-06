"use client";

import Link from "next/link";
import styles from "./Login.module.css";
import { z } from "zod";
import { emailSchema, passwordSchema } from "@/lib/zod-schemas";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ui/ErrorMessage";
import apiFetch from "@/lib/apiFetch";
import type { UserLoginResponse } from "@/lib/types/UserLoginPesponse";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type UserLoginData = z.infer<typeof userSchema>;

export default function LoginForm() {
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formError,
    formState: { errors },
    handleFetch,
  } = useFormHandler<UserLoginData>({
    schema: userSchema,
    userInputError: "Неверные почта или пароль.",
  });

  const onSubmit = async (data: UserLoginData) => {
    await handleFetch(async () => {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { role }: UserLoginResponse = await response.json();

        replace(`/profile/${role}`);
      }

      return response;
    });
  };

  return (
    <>
      <div className="text-center -mt-2 mb-2">
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </div>
      <form
        className="grid place-items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-1">
          <input
            {...register("email")}
            type="email"
            className="white drop-shadow"
            placeholder="Почта"
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <input
            {...register("password")}
            type="password"
            className="white drop-shadow"
            placeholder="Пароль"
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
      <Link href="/register/" className="text-[#4B4443] mt-6">
        Ещё не зарегистрированы?
      </Link>
    </>
  );
}
