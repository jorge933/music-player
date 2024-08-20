import Constants from "expo-constants";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import BackButton from "./components/BackButton";
import { HeaderProps } from "./Header.types";

export default function Header({ title, backButton }: HeaderProps) {
  setStatusBarBackgroundColor(COLORS.black, false);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {backButton ? <BackButton /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    marginTop: Constants.statusBarHeight,
    backgroundColor: COLORS.black,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.white,
    textAlign: "center",
  },
});
