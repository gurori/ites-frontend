import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, emailSchema, passwordSchema } from "@/lib/zod-schemas";
import ErrorMessage from "@/components/ErrorMessage";

export default function Register() {
  const userSchema = z.object({
    firstName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const onSubmit = (data) => console.log(data);
  return (
    <div className="h-screen bg-purple center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 place-items-center"
      >
        <div className="grid gap-1.5">
          
          <input
            {...register("firstName")}
            type="text"
            className="white drop-light"
            placeholder="Имя"
          />
          <ErrorMessage className="">{errors.firstName && errors.firstName.message}</ErrorMessage>
          <input
            {...register("email")}
            type="email"
            className="white drop-light"
            placeholder="Почта"
          />
          <ErrorMessage className="">{errors.email && errors.email.message}</ErrorMessage>
          <input
            {...register("password")}
            type="password"
            className="white drop-light"
            placeholder="Пароль"
          />
          <ErrorMessage className="">{errors.password && errors.password.message}</ErrorMessage>
        </div>
        <button type="submit" className="large text-white bg-black">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
