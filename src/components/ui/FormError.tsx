import { type FormError } from "@/lib/types/FormError";
import ErrorMessage from "./ErrorMessage";

export default function FormError({ error, className }: Readonly<{ error?: FormError, className?: string }>) {
  return error && <ErrorMessage className={className}>{error.message}</ErrorMessage>;
}
