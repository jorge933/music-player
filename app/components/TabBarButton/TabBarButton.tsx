import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TabBarButtonProps } from "./TabBarButton.props";
import { Href, Link, usePathname } from "expo-router";

export function TabBarButton({ href, title, iconName }: TabBarButtonProps) {
  const currentPath = usePathname();
  const focused = href === currentPath;

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
          size={16}
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
    justifyContent: "center",
    alignItems: "center",
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
