import { ValidationErrorMessage } from "@/hooks/useFormControl/useFormControl.types";

export const VALIDATION_ERRORS_MESSAGE: ValidationErrorMessage = {
  required: () => "This field is required",
  maxLength: (requiredLength, length) =>
    `Max. length: ${length}/${requiredLength}`,
};
