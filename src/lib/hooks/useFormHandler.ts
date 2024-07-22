import { useRouter } from "next/navigation";
import { useFormStates } from "./useFormStates";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IServerErrorMessage } from "../types/IServerErrorMessage";
import { type HttpMethod } from "../types/HttpMethod";
import apiFetch from "../apiFetch";

type UseFormHandlerProps = {
  schema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
  apiPath: string;
  token?: string;
  pushPath?: string;
  userInputError?: string;
  method?: Extract<HttpMethod, "POST" | "PUT">;
  defaultValues?: { [x: string]: any };
  isFile?: boolean;
  fileName?: string;
};

export const useFormHandler = ({
  schema,
  apiPath,
  pushPath,
  token,
  fileName,
  defaultValues,
  userInputError = "Ошибка. Пожалуйста повторите пойзже.",
  method = "POST",
  isFile = false,
}: UseFormHandlerProps) => {
  const { formError, formSuccess, setFormStates } = useFormStates();
  const { push, replace } = useRouter();

  type TypeFormData = z.infer<typeof schema>;
  type OnSubmit = (data: TypeFormData) => void;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit: OnSubmit = async (data) => {
      handleFetch(data, async (data) => {
        const formData = new FormData();
        if (isFile) {
          formData.append("file", data.file[0], fileName);
        }
        const auth = `Bearer ${token}`;
        const response = await apiFetch(apiPath, {
          credentials: "include",
          method: method,
          headers: isFile
            ? {
                Authorization: auth,
              }
            : { Authorization: auth, "Content-Type": "application/json" },
          body: isFile ? formData : JSON.stringify(data),
        });
        return response;
      })
  };

  const handleFetch = async ( data: TypeFormData, getResponse: (data: TypeFormData) => Response | Promise<Response>) => {
    try {
      const response = await getResponse(data)
      if (response.status === 401) push("/login");
      else if (response.ok) {
        setFormStates("", true);
        if (pushPath !== undefined) replace(pushPath);
        setTimeout(() => setFormStates(false), 400);
      } else {
        setFormStates(false);
        const error: IServerErrorMessage = await response.json();
        setFormStates(error.detail || userInputError);
      }
    }
    catch (error) {
      setFormStates("Ошибка. Пожалуйста повторите пойзже.", false);
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFetch,
    errors,
    formError,
    formSuccess,
    control,
  };
};
