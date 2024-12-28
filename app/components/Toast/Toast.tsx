import { COLORS } from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { ToastProps } from "./Toast.types";

export function Toast({ message, type }: ToastProps) {
  const animationDuration = 700;
  const translateY = new Animated.Value(100);
  const zIndex = new Animated.Value(999);
  const iconProps = {
    size: 22,
    color: COLORS.white,
    style: [styles.icon, styles[(type + "Icon") as keyof typeof styles]],
  };
  const icons = {
    success: <Entypo name="check" {...iconProps} />,
    info: <Ionicons name="information" {...iconProps} />,
    error: <AntDesign name="close" {...iconProps} />,
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => zIndex.setValue(1), animationDuration);
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        styles[type],
        { transform: [{ translateY }], zIndex },
      ]}
    >
      {icons[type]}
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    width: "85%",
    minHeight: 50,
    paddingHorizontal: 50,
    paddingVertical: 20,
    marginVertical: 5,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  success: {
    backgroundColor: COLORS.toastSuccessBackground,
  },
  info: {
    backgroundColor: COLORS.toastInfoBackground,
  },
  error: {
    backgroundColor: COLORS.toastErrorBackground,
  },
  icon: {
    padding: 5,
    borderRadius: 50,
    marginRight: 10,
  },
  successIcon: {
    backgroundColor: COLORS.toastIconSuccess,
  },
  infoIcon: {
    backgroundColor: COLORS.toastIconInfo,
  },
  errorIcon: {
    backgroundColor: COLORS.toastIconError,
  },
  text: {
    color: "white",
    flex: 1,
    textAlign: "left",
  },
});
