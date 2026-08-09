"use client";

import { useState } from "react";

export const useFormStates = () => {
  type FormError = string | null;
  const [formError, setAuthError] = useState<FormError>(null);
  const [formSuccess, setAuthSuccess] = useState(false);

  function setFormStates(errorState: FormError, successState?: boolean): void;
  function setFormStates(successState: boolean): void;

  function setFormStates(value1: FormError | boolean, value2?: boolean): void {
    if (value1 === null || typeof value1 === "string") {
      setAuthError(value1);
    }
    if (typeof value2 === "boolean") setAuthSuccess(value2);
    else if (typeof value1 === "boolean") setAuthSuccess(value1);
  }

  return { formError, formSuccess, setFormStates };
};
