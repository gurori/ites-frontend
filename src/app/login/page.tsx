'use client'

import Link from "next/link";
import styles from "./Login.module.css";
import { z } from "zod";
import { emailSchema, passwordSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ErrorMessage";

export default function LoginPage() {
  const userSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  });

  type formData = z.infer<typeof userSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: formData): void => console.log(data);

  return (
    <div className="h-screen center bg-black px-4">
      <div className={styles.whiteBox}>
        <img
          src="/icons/user.png"
          className="absolute size-40 top-0 -translate-y-1/2"
          alt="user icon"
        />
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
        <Link href="/register/" className="text-[#4B4443]">
          Ещё не зарегистрированы?
        </Link>
      </div>
    </div>
  );
}
