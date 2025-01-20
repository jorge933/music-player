import { COLORS } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";
import { CustomButtonProps } from "./Button.types";

export function Button(props: CustomButtonProps) {
  const { onPress, title, disabled, icon, disabledStyles } = props;

  return (
    <Pressable
      {...props}
      style={{
        ...styles.button,
        ...props.buttonStyles,
        ...(disabled ? disabledStyles || styles.disabled : {}),
      }}
      onPress={!disabled ? onPress : () => {}}
      disabled={disabled}
    >
      {icon}
      {title && (
        <Text style={{ ...styles.text, ...props.textStyles }}>{title}</Text>
      )}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    fontFamily: "LatoBold",
    fontSize: 16,
  },
  disabled: {
    opacity: 0.7,
    backgroundColor: COLORS.grey,
  },
});
