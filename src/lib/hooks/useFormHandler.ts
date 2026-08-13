"use client";

import { useRouter } from "next/navigation";
import { useFormStates } from "./useFormStates";
import { z } from "zod";
import { type FieldValues, type UseFormProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IServerErrorMessage } from "../types/IServerErrorMessage";
import { type HttpMethod } from "../types/HttpMethod";
import apiFetch from "../apiFetch";
import { useCallback, useEffect } from "react";

export type UserRedirect = {
  type: "push" | "replace";
  href: string;
  prefetchOptions?: Parameters<ReturnType<typeof useRouter>["prefetch"]>[1];
};

export type UseFormHandlerProps<TFormData extends FieldValues> = {
  schema: z.ZodTypeAny;
  apiPath?: string;
  token?: string;
  userRedirect?: UserRedirect;
  userInputError?: string;
  method?: Extract<HttpMethod, "POST" | "PUT">;
  defaultValues?: UseFormProps<TFormData>["defaultValues"];
  fileName?: string;
};

export const useFormHandler = <TFormData extends FieldValues>({
  schema,
  apiPath,
  token,
  userRedirect,
  defaultValues,
  fileName,
  userInputError = "Ошибка. Пожалуйста, повторите позже.",
  method = "POST",
}: UseFormHandlerProps<TFormData>) => {
  const { formError, formSuccess, setError, setSuccess } = useFormStates();
  const router = useRouter();

  useEffect(() => {
    if (userRedirect) {
      router.prefetch(userRedirect.href, userRedirect.prefetchOptions);
    }
  }, [userRedirect, router]);

  const form = useForm<TFormData>({
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

        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        if (isJson) {
          const error: IServerErrorMessage = await response.json();
          setError(error.detail || userInputError);
        } else {
          setError(userInputError);
        }
      } catch (error) {
        console.error("Submission error:", error);
        setError(userInputError);
      }
    },
    [router, userRedirect, userInputError, setError, setSuccess],
  );

  const onSubmit = useCallback(
    async (data: TFormData) => {
      if (!apiPath) {
        console.warn("No apiPath provided to useFormHandler");
        return;
      }

      await handleFetch(async () => {
        const isFile = Boolean(fileName);
        const formData = new FormData();
        const headers = new Headers();
        let body: BodyInit;

        if (isFile) {
          const files = data.file as File[] | undefined;

          if (files && files.length > 0) {
            formData.append("file", files[0], fileName);
          }

          body = formData;
        } else {
          headers.set("Content-Type", "application/json");
          body = JSON.stringify(data);
        }

        const response = await apiFetch(apiPath, {
          method,
          headers,
          token,
          body,
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
