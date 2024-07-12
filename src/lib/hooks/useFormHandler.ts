import { useRouter } from "next/navigation";
import { useFormStates } from "./useFormStates";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IServerErrorMessage } from "../types/IServerErrorMessage";
import { type HttpMethod } from "../types/HttpMethod";
import Cookies from "js-cookie";

type UseFormHandlerProps = {
  schema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
  apiPath: string;
  pushPath?: string;
  userInputError?: string;
  method?: Extract<HttpMethod, "POST" | "PUT">;
  defaultValues?:  {[x: string]: any;}
};

export const useFormHandler = ({
  schema,
  apiPath,
  pushPath,
  userInputError = "Ошибка. Пожалуйста повторите пойзже.",
  method = "POST",
  defaultValues
}: UseFormHandlerProps) => {
  const { formError, formSuccess, setFormStates } = useFormStates();
  const { push, replace } = useRouter();

  type FormData = z.infer<typeof schema>;
  type OnSubmit = (data: FormData) => void;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: defaultValues });

  const onSubmit: OnSubmit = async (data) => {
    console.log(data)
    try {
      const token = Cookies.get("auth");
      const auth = token !== undefined ? `Bearer ${token}` : "";
      const response = await fetch(apiPath, {
        credentials: "include",
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify(data),
      });
      
      if(response.status === 401)
        replace("/login")
      else if (response.ok) {
        setFormStates("", true);
        if (pushPath !== undefined) 
          push(pushPath);
      } else {
        setFormStates(false);
        const error: IServerErrorMessage = await response.json();
        setFormStates(error.detail || userInputError);
      }
    } catch (error) {
      setFormStates("Ошибка. Пожалуйста повторите пойзже.", false);
    }
  };
  return { register, handleSubmit, onSubmit, errors, formError, formSuccess, control };
};
