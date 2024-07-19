import Image from "next/image";
import UpdateProfileProperty from "./UpdateProfileProperty";
import { Pencil } from "lucide-react";
import SubmitButton from "@/components/ui/SubmitButton";
import { imageSchema } from "@/lib/zod-schemas";
import { z } from "zod";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { apiUrl } from "@/lib/constants";

export default function AvatarForm({
  userId,
  token,
}: Readonly<{ userId: string; token: string }>) {
  const avatarSchema = z.object({ file: imageSchema });
  const { errors, formError, formSuccess, handleSubmit, onSubmit, register } =
    useFormHandler({
      apiPath: `/api/files/users/${userId}`,
      schema: avatarSchema,
      fileName: "avatar.jpg",
      token: token,
      isFile: true,
      pushPath: "/profile",
    });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UpdateProfileProperty text="Выберите аватарку" className="relative mb-4">
        <Image
          width={200}
          height={200}
          src={`${apiUrl}/api/Files/users/${userId}/avatar.jpg`}
          alt="avatar"
          className="rounded-full size-[200px]"
        />
        <div className="size-[38px] rounded-full bg-gray-500 center absolute bottom-0 left-40">
          <Pencil className="text-white" size={20} />
        </div>
        <input
          {...register("file")}
          type="file"
          className="absolute size-10 rounded-full cursor-pointer opacity-0 bottom-0 left-40"
        />
      </UpdateProfileProperty>
      <FormError error={errors.file} />
      {formSuccess && <p className="text-green-500">Успешно!</p>}
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      <SubmitButton className="bg-yellow text-black-800" />
    </form>
  );
}
