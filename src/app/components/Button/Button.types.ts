import { PressableProps, StyleSheet } from "react-native";

type StyleSheetType = StyleSheet.NamedStyles<unknown>;

export type CustomButtonProps = PressableProps & {
  buttonStyles?: StyleSheetType;
  textStyles?: StyleSheetType;
  disabledStyles?: StyleSheetType;
  icon?: React.JSX.Element;
  title?: string;
};
