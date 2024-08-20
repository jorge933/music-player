import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function BackButton() {
  return (
    <View style={styles.backButton}>
      <Ionicons
        name="arrow-back"
        size={22}
        color={COLORS.white}
        style={{ marginTop: 3 }}
      />
      <Text style={styles.text} onPress={router.back}>
        Back
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    marginLeft: 20,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.white,
  },
});
