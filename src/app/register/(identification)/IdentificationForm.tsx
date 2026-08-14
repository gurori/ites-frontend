"use client";

import { roles } from "@/lib/constants";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { roleSchema } from "@/lib/zod-schemas";
import { useController } from "react-hook-form";
import { z } from "zod";
import SelectRole from "./SelectRole";
import { useEffect, useState } from "react";
import type { Role } from "@/lib/types/Role";
import { getRoleEng } from "@/lib/utils";
import apiFetch from "@/lib/apiFetch";
import FormError from "@/components/ui/FormError";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SecretKeyForm from "./SecretKeyForm";
import { type UserRegisterData } from "../RegisterForm";

const identificationSchema = z.object({ role: roleSchema });

type IdentificationData = z.infer<typeof identificationSchema>;

export type CompleteRegistrationData = UserRegisterData & IdentificationData;

export default function IdentificationForm({
  formData,
}: Readonly<{ formData: UserRegisterData }>) {
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [userData, setUserData] = useState<CompleteRegistrationData | null>(
    null,
  );
  const { replace } = useRouter();

  const {
    control,
    formError,
    formSuccess,
    formState: { errors },
    handleSubmit,
    handleFetch,
  } = useFormHandler<IdentificationData>({
    schema: identificationSchema,
    userRedirect: {
      href: "/login",
      type: "replace",
    },
  });

  const { field } = useController({
    control,
    name: "role",
    defaultValue: "Member",
  });

  const onSubmit = (data: IdentificationData) => {
    if (data.role === "organizer") {
      setUserData({ ...data, ...formData });
      setIsOrganizer(true);
    } else
      handleFetch(async () =>
        apiFetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, ...formData }),
        }),
      );
  };

  useEffect(() => {
    if (formSuccess)
      toast.success("Регистрация прошла успешно!", {
        description: "Войдите в систему, чтобы продолжить.",
      });
    else if (formError) {
      toast.error(formError);
    }
  }, [formSuccess, formError, replace]);

  if (isOrganizer && userData) {
    return <SecretKeyForm formData={userData} handleFetch={handleFetch} />;
  }

  return (
    <div className="bg-black-800 h-screen center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:gap-12 justify-items-center"
      >
        <label className="text-white">Продолжить как...</label>
        <div className="grid gap-4 md:flex md:gap-8">
          {roles.map((role) => {
            const roleEng = getRoleEng(role);
            return (
              <SelectRole
                key={role}
                role={role}
                active={field.value === roleEng}
                onClick={() => {
                  field.onChange(roleEng);
                }}
              />
            );
          })}
        </div>
        <button className="small px-16 bg-purple text-white">Далее</button>
        <FormError error={errors.role} />
      </form>
    </div>
  );
}
