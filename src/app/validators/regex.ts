import { Validator } from "@/hooks/useFormControl/useFormControl.types";

export function regex(regex: RegExp, errorMessage: string): Validator {
  return (value: string) => {
    const isValid = regex.test(value);

    return isValid ? null : { regex: errorMessage };
  };
}
