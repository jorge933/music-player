import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TabBarButtonProps } from "./TabBarButton.types";

export function TabBarButton({
  href,
  title,
  iconName,
  focused,
}: TabBarButtonProps) {
  return (
    <Link href={href as Href}>
      <View
        style={{
          ...styles.button,
          backgroundColor: focused ? COLORS.black : "transparent",
        }}
        testID="button"
      >
        <Ionicons
          //@ts-ignore
          name={iconName || "add"}
          size={20}
          color={focused ? COLORS.green : COLORS.white}
          testID="icon"
        />
        <Text
          style={{
            ...styles.text,
            color: focused ? COLORS.green : COLORS.white,
          }}
        >
          {title}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 50,
  },
  buttonSelected: {
    backgroundColor: COLORS.black,
  },
  text: {
    fontSize: 12,
    fontFamily: "LatoSemiBold",
  },
});
