import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type FormError = FieldError | Merge<FieldError, FieldErrorsImpl<any>>;