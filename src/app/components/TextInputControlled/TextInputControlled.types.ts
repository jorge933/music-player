import { Rules } from "@/constants/ValidationErrorsMessage";
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
  rules?: Rules;
  inputProps?: TextInputProps;
  inputStyles?: StyleSheet.NamedStyles<unknown>;
  inputContainerStyles?: StyleSheet.NamedStyles<unknown>;
  reset?: UseFormReset<FieldValues>;
}
