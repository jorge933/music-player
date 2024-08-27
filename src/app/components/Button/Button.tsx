import { COLORS } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";
import { CustomButtonProps } from "./Button.types";

export default function Button(props: CustomButtonProps) {
  const { onPress, title, disabled } = props;
  return (
    <Pressable
      style={{
        ...props.buttonStyles,
        ...styles.button,
        ...(disabled && styles.disabled),
      }}
      onPress={!disabled ? onPress : () => {}}
      disabled={disabled}
    >
      <Text style={{ ...props.textStyles, ...styles.text }}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.green,
    borderRadius: 50,
    textAlign: "center",
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "LatoBold",
    fontSize: 16,
  },
  disabled: {
    opacity: 0.7,
    backgroundColor: COLORS.grey,
  },
});
