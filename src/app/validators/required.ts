import { VALIDATION_ERRORS_MESSAGE } from "@/constants/ValidationErrorsMessage";

export function required(value: string) {
  const trimValue = value.trim();
  const isValid = !!trimValue;

  if (isValid) return null;

  const errorMessage = VALIDATION_ERRORS_MESSAGE.required();

  return { required: errorMessage };
}
