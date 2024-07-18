'use client'

import { useState } from "react";

export const useFormStates = () => {
  type Error = string | null;
  const [formError, setAuthError] = useState<Error>(null);
  const [formSuccess, setAuthSuccess] = useState(false);

  function setFormStates(errorState: Error, successState?: boolean): void;
  function setFormStates(successState: boolean): void;

  function setFormStates(value1: Error | boolean, value2?: boolean): void {
    if (typeof value1 === "string" && "null") setAuthError(value1);
    if (typeof value2 === "boolean") setAuthSuccess(value2);
    else if (typeof value1 === "boolean") setAuthSuccess(value1);
  }

  return { formError, formSuccess, setFormStates };
};
