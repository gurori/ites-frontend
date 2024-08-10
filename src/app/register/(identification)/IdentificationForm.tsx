"use client";

import { roles } from "@/lib/constants";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { roleSchema } from "@/lib/zod-schemas";
import { useController } from "react-hook-form";
import { z } from "zod";
import SelectRole from "./SelectRole";
import { useEffect, useState } from "react";
import { Role } from "@/lib/types/Role";
import { getRoleEng } from "@/lib/utils";
import apiFetch from "@/lib/apiFetch";
import FormError from "@/components/ui/FormError";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function IdentificationForm({
  formData,
}: Readonly<{ formData: any }>) {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const { push } = useRouter();

  const identificationSchema = z.object({ role: roleSchema });
  const { control, errors, formError, formSuccess, handleSubmit, handleFetch } =
    useFormHandler({
      schema: identificationSchema,
      pushPath: "/login",
    });
  const { field } = useController({
    control,
    name: "role",
    defaultValue: "Member",
  });
  const onSubmit = (data: any) => {
    handleFetch(
      data,
      async (data) =>
        await apiFetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, ...formData }),
        })
    );
  };

  useEffect(() => {
    if (formSuccess)
      toast("Регистрация прошла успешно!", {
        description: "Войдите в систему, чтобы продолжить.",
      });
    else if (formError) {
      toast(formError);
      push("/login");
    }
  }, [formSuccess, formError]);
  return (
    <div className="bg-black-800 h-screen center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-12 justify-items-center"
      >
        <label className="text-white">Продолжить как...</label>
        <div className="flex gap-8">
          {roles.map((role) => (
            <SelectRole
              key={role}
              role={role}
              active={activeRole === role}
              onClick={() => {
                setActiveRole(role);
                field.onChange(getRoleEng(role));
              }}
            />
          ))}
        </div>
        <button className="small px-16 bg-purple text-white">Далее</button>
        <FormError error={errors.role} />
      </form>
    </div>
  );
}
