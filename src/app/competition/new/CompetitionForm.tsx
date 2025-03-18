"use client";

import Editor from "@/components/editor/Editor";
import BackButton from "@/components/ui/buttons/BackButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormError from "@/components/ui/FormError";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { cn } from "@/lib/utils";
import { xlTextSchema } from "@/lib/zod-schemas";
import { useRouter } from "next/navigation";
import { useController } from "react-hook-form";
import { z } from "zod";
import s from "@/components/info-card/InfoCard.module.css";

export default function CompetitionForm({
  token,
}: Readonly<{ token: string }>) {
  const { back } = useRouter();
  const competitionSchema = z.object({
    contentInHtml: xlTextSchema,
  });
  const { control, errors, formError, handleSubmit, onSubmit } = useFormHandler(
    {
      schema: competitionSchema,
      apiPath: "/api/Competitions/create",
      token: token,
      pushPath: "/profile/organizer",
    }
  );
  const { field } = useController({ control, name: "contentInHtml" });
  return (
    <div className={cn(s.card, "p-4 md:p-10")}>
      <div className="flex gap-6 items-center mb-8">
        <BackButton onClick={() => back()} />
        <p className="text-black">Новый конкурс</p>
      </div>
      <Editor field={field} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <FormError error={errors.contentInHtml} />
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
    </div>
  );
}
