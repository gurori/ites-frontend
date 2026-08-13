"use client";

import apiFetch from "@/lib/apiFetch";
import { useState } from "react";
import { type CompleteRegistrationData } from "./IdentificationForm";
import { useFormHandler } from "@/lib/hooks/useFormHandler";

export default function SecretKeyForm({
  formData,
  handleFetch,
}: Readonly<{
  formData: CompleteRegistrationData;
  handleFetch: ReturnType<typeof useFormHandler>["handleFetch"];
}>) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!key.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await apiFetch(`/api/user/organizer/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (res.ok) {
        await handleFetch(async () =>
          apiFetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }),
        );
      } else {
        setError("Неверный код.");
      }
    } catch (err) {
      console.error("Confirmation error:", err);
      setError("Ошибка соединения. Пожалуйста, повторите позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black-800 h-screen center">
      <form
        onSubmit={onSubmit}
        className="grid gap-6 md:gap-10 justify-items-center"
      >
        <label className="text-white" htmlFor="secret-key">
          Введите код для подтверждения
        </label>
        <input
          id="secret-key"
          type="text"
          className="white"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          disabled={isLoading}
        />
        {error && <p className="text-red-500 -my-6">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="small px-12 bg-purple text-white disabled:opacity-50"
        >
          {isLoading ? "Загрузка..." : "Продолжить"}
        </button>
      </form>
    </div>
  );
}
