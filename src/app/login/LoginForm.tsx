"use client";

import Link from "next/link";
import styles from "./Login.module.css";
import { boolean, z } from "zod";
import { emailSchema, passwordSchema } from "@/lib/zod-schemas";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Image from "next/image";
import apiFetch from "@/lib/apiFetch";
import { setCookie } from "../actions";

export default function LoginForm() {
  const userSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });
  const { register, handleSubmit, errors, formError, handleFetch } =
    useFormHandler({
      schema: userSchema,
      pushPath: "/profile",
      userInputError: "Неверные почта или пароль",
    });
    const onSubmit = async (data: any) => {
      handleFetch(data, async (data) => {
        const res = await apiFetch("/api/User/login", {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        })
        if(res.ok) {
          setCookie("auth", await res.text(), {secure: true, httpOnly: true, sameSite: "strict"});
        }
        return res
      });
    }
  return (
    <div className="h-screen center bg-black px-4">
      <div className={styles.whiteBox}>
        <Image
          src="/icons/user.png"
          className="absolute top-0 -translate-y-1/2"
          alt="user icon"
          width={160}
          height={160}
        />
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
            <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
            <input
              {...register("password")}
              type="password"
              className="white drop-shadow"
              placeholder="Пароль"
            />
            <ErrorMessage>
              {errors.password && errors.password.message}
            </ErrorMessage>
          </div>
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
        <Link href="/register/" className="text-[#4B4443] mt-6">
          Ещё не зарегистрированы?
        </Link>
      </div>
    </div>
  );
}
