import { VALIDATION_ERRORS_MESSAGE } from "@/constants/ValidationErrorsMessage";

export function maxLength(maxLength: number) {
  return (value: string) => {
    const { length } = value.trim();
    const isValid = length <= maxLength;

    if (isValid) return null;

    const errorMessage = VALIDATION_ERRORS_MESSAGE.maxLength(maxLength, length);

    return { maxLength: errorMessage };
  };
}
