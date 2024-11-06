import {
  Control,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormReset,
} from "react-hook-form";
import { StyleSheet, TextInputProps } from "react-native";

export interface TextInputControlledProps {
  name: string;
  control: Control<FieldValues, unknown>;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  inputProps?: TextInputProps;
  inputStyles?: StyleSheet.NamedStyles<unknown>;
  inputContainerStyles?: StyleSheet.NamedStyles<unknown>;
  errors: FieldErrors<FieldValues>;
  reset?: UseFormReset<FieldValues>;
}
