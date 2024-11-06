import { RegisterOptions } from "react-hook-form";

export const VALIDATION_ERRORS_MESSAGE: Errors = {
  required: () => "This field is required",
  maxLength: (rules, length) => `Max. length: ${length}/${rules.maxLength}`,
};

export interface Errors {
  required: () => string;
  maxLength: (rules: Rules, length: number) => string;
}

export type Rules = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;
