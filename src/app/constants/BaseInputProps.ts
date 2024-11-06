import { TextInputProps } from "react-native";
import { COLORS } from "./Colors";

export const BASE_INPUT_PROPS: TextInputProps = {
  placeholder: "New Playlist Name...",
  placeholderTextColor: COLORS.transparentWhite,
  selectionColor: COLORS.transparentGreen,
  enterKeyHint: "search",
};
