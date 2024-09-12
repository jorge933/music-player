import { ButtonProps, StyleSheet } from "react-native";

type StyleSheetType = StyleSheet.NamedStyles<unknown>;

export type CustomButtonProps = ButtonProps & {
  buttonStyles?: StyleSheetType;
  textStyles?: StyleSheetType;
  icon?: React.JSX.Element;
};
