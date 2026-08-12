"use client";

import { useCallback, useState } from "react";

export type FormStates = { error: string | null; success: boolean };

const DEFAULT_FORM_STATES: FormStates = { error: null, success: false };

export const useFormStates = (
  initialValue: FormStates = DEFAULT_FORM_STATES,
) => {
  const [formStates, setFormStates] = useState<FormStates>(initialValue);

  const setError = useCallback((error: string) => {
    setFormStates({ error, success: false });
  }, []);

  const setSuccess = useCallback((success = true) => {
    setFormStates({ error: null, success });
  }, []);

  const resetFormStates = useCallback(() => {
    setFormStates(initialValue);
  }, [initialValue]);

  return {
    formError: formStates.error,
    formSuccess: formStates.success,
    setError,
    setSuccess,
    resetFormStates,
    setFormStates,
  };
};
