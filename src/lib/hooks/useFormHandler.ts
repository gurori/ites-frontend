"use client";

import { useRouter } from "next/navigation";
import { useFormStates } from "./useFormStates";
import { z } from "zod";
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IServerErrorMessage } from "../types/IServerErrorMessage";
import { type HttpMethod } from "../types/HttpMethod";
import apiFetch from "../apiFetch";
import { useCallback, useEffect } from "react";

export type UserRedirect = {
  type: "push" | "replace";
  href: string;
  prefetch?: Parameters<ReturnType<typeof useRouter>["prefetch"]>;
};

export type UseFormHandlerProps<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  apiPath: string;
  token?: string;
  userRedirect?: UserRedirect;
  userInputError?: string;
  method?: Extract<HttpMethod, "POST" | "PUT">;
  defaultValues?: UseFormProps<z.infer<TSchema>>["defaultValues"];
  fileName?: string;
};

export const useFormHandler = <TSchema extends z.ZodTypeAny>({
  schema,
  apiPath,
  token,
  userRedirect,
  defaultValues,
  fileName,
  userInputError = "Ошибка. Пожалуйста, повторите позже.",
  method = "POST",
}: UseFormHandlerProps<TSchema>) => {
  const { formError, formSuccess, setError, setSuccess } = useFormStates();
  const router = useRouter();

  const prefetchUrl = userRedirect?.prefetch?.[0];
  const prefetchOptions = userRedirect?.prefetch?.[1];

  useEffect(() => {
    if (prefetchUrl) {
      router.prefetch(prefetchUrl, prefetchOptions);
    }
  }, [prefetchUrl, prefetchOptions, router]);

  type FormData = z.infer<TSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFetch = useCallback(
    async (getResponse: () => Promise<Response>) => {
      try {
        const response = await getResponse();

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        if (response.ok) {
          setSuccess();
          if (userRedirect) {
            router[userRedirect.type](userRedirect.href);
          }
          return;
        }

        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          const error: IServerErrorMessage = await response.json();
          setError(error.detail || userInputError);
        } else {
          setError(userInputError);
        }
      } catch (error) {
        console.error("Submission error:", error);
        setError("Ошибка. Пожалуйста, повторите позже.");
      }
    },
    [router, userRedirect, userInputError, setError, setSuccess],
  );

  const onSubmit = useCallback(
    async (data: FormData) => {
      await handleFetch(async () => {
        const isFile = Boolean(fileName);
        const formData = new FormData();
        const headers = new Headers();

        if (isFile) {
          formData.append("file", (data as { file: File[] }).file[0], fileName);
        } else {
          headers.set("Content-Type", "application/json");
        }

        const response = await apiFetch(apiPath, {
          method: method,
          headers,
          token,
          body: isFile ? formData : JSON.stringify(data),
        });

        return response;
      });
    },
    [apiPath, method, token, fileName, handleFetch],
  );

  return {
    onSubmit,
    handleFetch,
    formError,
    formSuccess,
    ...form,
  };
};
