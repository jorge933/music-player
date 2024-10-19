import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TabBarButtonProps } from "./TabBarButton.props";

export default function TabBarButton({
  focused,
  title,
  iconName,
}: TabBarButtonProps) {
  return (
    <View
      style={{
        ...styles.button,
        backgroundColor: focused ? COLORS.black : "transparent",
      }}
    >
      <Ionicons
        //@ts-ignore
        name={iconName}
        size={16}
        color={focused ? COLORS.green : COLORS.white}
      />
      <Text
        style={{ ...styles.text, color: focused ? COLORS.green : COLORS.white }}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  buttonSelected: {
    backgroundColor: COLORS.black,
  },
  text: {
    fontFamily: "LatoSemiBold",
  },
});
