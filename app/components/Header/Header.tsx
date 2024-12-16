import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { BackButton } from "./components/BackButton";
import { HeaderProps } from "./Header.types";

export function Header({ title, backButton }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {backButton && <BackButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: COLORS.black,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "LatoExtraBold",
    color: COLORS.white,
    textAlign: "center",
  },
});
