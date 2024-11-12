import { Rules } from "@/constants/ValidationErrorsMessage";
import { Control, FieldValues, UseFormReset } from "react-hook-form";
import { StyleSheet, TextInputProps } from "react-native";

export interface TextInputControlledProps<FormValues extends FieldValues> {
  name: string;
  control: Control<FormValues, unknown>;
  rules?: Rules;
  inputProps?: TextInputProps;
  inputStyles?: StyleSheet.NamedStyles<unknown>;
  inputContainerStyles?: StyleSheet.NamedStyles<unknown>;
  reset?: UseFormReset<FieldValues>;
}
