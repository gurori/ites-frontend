import Image from "next/image";
import UpdateProfileProperty from "./UpdateProfileProperty";
import { Pencil } from "lucide-react";
import SubmitButton from "@/components/ui/SubmitButton";
import { imageSchema } from "@/lib/zod-schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/ui/FormError";
import apiFetch from "@/lib/apiFetch";

export default function AvatarForm({
  userId,
  token,
}: Readonly<{ userId: string; token: string }>) {
  const avatarSchema = z.object({ avatar: imageSchema });
  type FormDataType = z.infer<typeof avatarSchema>;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(avatarSchema) });
  async function onSubmit(data: FormDataType) {
    const formData = new FormData();
    formData.append("image", data.avatar[0], "avatar.jpg");
    const response = await apiFetch(`/api/files/users/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log(response)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UpdateProfileProperty text="Выберите аватарку" className="relative mb-4">
        <Image
          width={200}
          height={200}
          src={`https://localhost:64948/api/Files/users/${userId}/avatar.jpg`}
          alt="avatar"
          className="rounded-full size-[200px]"
        />
        <div className="size-[38px] rounded-full bg-gray-500 center absolute bottom-0 left-40">
          <Pencil className="text-white" size={20} />
        </div>
        <input
          {...register("avatar")}
          type="file"
          className="absolute size-10 rounded-full cursor-pointer opacity-0 bottom-0 left-40"
        />
      </UpdateProfileProperty>
        <FormError error={errors.avatar} />
      <SubmitButton className="bg-yellow text-black-800" />
    </form>
  );
}
