import { UseFormControlReturn } from "@/hooks/useFormControl/useFormControl.types";
import { StyleSheet, TextInputProps } from "react-native";

export interface TextInputControlledProps {
  control: UseFormControlReturn;
  inputProps?: TextInputProps;
  inputStyles?: StyleSheet.NamedStyles<unknown>;
  inputContainerStyles?: StyleSheet.NamedStyles<unknown>;
  resetButton?: boolean;
}
