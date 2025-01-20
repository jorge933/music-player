import { TextInputProps } from "react-native";
import { COLORS } from "./Colors";

export const BASE_INPUT_PROPS: TextInputProps = {
  placeholderTextColor: COLORS.transparentWhite,
  selectionColor: COLORS.transparentGreen,
  enterKeyHint: "search",
};
