import { COLORS } from "@/constants/Colors";
import { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { ToastProps } from "./Toast.types";

export function Toast({ message, type }: ToastProps) {
  const animationDuration = 700;
  const translateY = new Animated.Value(100);
  const zIndex = new Animated.Value(999);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setTimeout(() => zIndex.setValue(1), animationDuration);
  }, []);

  return (
    <Animated.View
      style={[
        styles.baseStyles,
        styles[type],
        { transform: [{ translateY }], zIndex },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  baseStyles: {
    width: "70%",
    height: 50,
    marginVertical: 5,
    marginHorizontal: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  success: {
    backgroundColor: COLORS.toastSuccessBackground,
  },
  info: {
    backgroundColor: COLORS.blue,
  },
  error: {
    backgroundColor: COLORS.toastErrorBackground,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
