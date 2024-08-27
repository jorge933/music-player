import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { StyleSheet, TextInputProps } from "react-native";

export interface TextInputControlledProps {
  name: string;
  control: Control<FieldValues, unknown>;
  rules: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  inputProps?: TextInputProps;
  inputStyles?: StyleSheet.NamedStyles<unknown>;
  errors: Errors;
}

export interface Errors {
  [key: string]: {
    type: string;
  };
}
