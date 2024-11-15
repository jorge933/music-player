export interface ValidationErrorMessage {
  required: () => string;
  maxLength: (requiredLength: number, length: number) => string;
}

type ValidationErrorMessageKeys = keyof ValidationErrorMessage;
export type Errors = Partial<{
  [Key in ValidationErrorMessageKeys]: string;
}> | null;

export type Validator = (value: string) => Errors | null;

export interface UseFormControlReturn {
  value: string;
  errors: Errors;
  isValid: boolean;
  isDirty: boolean;
  handleOnChange: (newValue: string) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
