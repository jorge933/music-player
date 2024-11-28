import { useEffect, useRef, useState } from "react";
import {
  Errors,
  UseFormControlReturn,
  Validator,
} from "./useFormControl.types";
import { TextInput } from "react-native";

function validate(validators: Validator[], newValue: string): Errors {
  let firstError: Errors = null;

  validators.forEach((validator) => {
    if (firstError) return;

    const error = validator(newValue);

    if (error) firstError = error;
  });

  return firstError;
}

export function useFormControl(
  initialValue: string | null,
  validators?: Validator[],
): UseFormControlReturn {
  const [value, setValue] = useState(initialValue || "");
  const [errors, setErrors] = useState<Errors>(null);
  const [isValid, setIsValid] = useState(!validators);
  const [isDirty, setIsDirty] = useState(false);

  const handleOnChange = (newValue: string) => {
    setValue(newValue);

    if (!isDirty) setIsDirty(true);

    if (validators) {
      const firstErrorFound = validate(validators, newValue);

      setErrors(firstErrorFound);
      setIsValid(!firstErrorFound);
    }
  };

  return {
    value,
    errors,
    isValid,
    isDirty,
    handleOnChange,
    resetValue: () => setValue(""),
  };
}
