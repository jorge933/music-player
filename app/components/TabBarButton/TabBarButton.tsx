import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TabBarButtonProps } from "./TabBarButton.props";

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
      >
        <Ionicons
          //@ts-ignore
          name={iconName}
          size={18}
          color={focused ? COLORS.green : COLORS.white}
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
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonSelected: {
    backgroundColor: COLORS.black,
  },
  text: {
    fontSize: 14,
    fontFamily: "LatoSemiBold",
  },
});
