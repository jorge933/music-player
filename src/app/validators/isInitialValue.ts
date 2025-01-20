import { VALIDATION_ERRORS_MESSAGE } from "@/constants/ValidationErrorsMessage";

export function isInitialValue(initialValue: string) {
  return (value: string) => {
    const isInitialValue = initialValue === value;

    return isInitialValue
      ? { isInitialValue: VALIDATION_ERRORS_MESSAGE.isInitialValue() }
      : null;
  };
}
