import { ValidationErrorsMessage } from "@/hooks/useFormControl/useFormControl.types";

export const VALIDATION_ERRORS_MESSAGE: ValidationErrorsMessage = {
  required: () => "This field is required",
  maxLength: (requiredLength, currentLength) =>
    `Max. Length: ${currentLength}/${requiredLength}`,
  isInitialValue: () => "This field cannot have the initial value",
};
