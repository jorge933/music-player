export interface ValidationErrorsMessage {
  required: () => string;
  maxLength: (requiredLength: number, currentLength: number) => string;
  isInitialValue: () => string;
  regex?: () => string;
}

type ValidationErrorsKeys = keyof ValidationErrorsMessage;
type Error = { [Key in ValidationErrorsKeys]: string };

export type Errors = Partial<Error> | null;

export type Validator = (value: string) => Errors;

export interface UseFormControlReturn {
  value: string;
  errors: Errors;
  isValid: boolean;
  isDirty: boolean;
  handleOnChange: (newValue: string) => void;
  resetControl: () => void;
}
