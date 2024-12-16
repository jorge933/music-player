import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export function BackButton() {
  return (
    <Pressable onPress={router.back} style={styles.backButton}>
      <Ionicons
        name="arrow-back"
        size={22}
        color={COLORS.white}
        style={{ marginTop: 3, marginLeft: 20 }}
      />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    height: "100%",
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: "LatoSemiBold",
    color: COLORS.white,
  },
});
