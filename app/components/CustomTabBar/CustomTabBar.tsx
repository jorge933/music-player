import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomTabBarPros, TabBarButton } from "./CustomTabBar.types";

export function CustomTabBar({
  state: { routes, index: focusedIndex },
  descriptors,
  keyboardActive,
}: CustomTabBarPros) {
  if (keyboardActive) return null;

  return (
    <View style={styles.tabBar}>
      {routes.map(({ key }, currentIndex) => {
        const { options, route } = descriptors[key];
        const tabBarButton = options.tabBarButton as TabBarButton;
        const href = `/(tabs)/${route.name}`.replace("index", "");
        const focused = focusedIndex === currentIndex;

        return <View key={route.key}>{tabBarButton({ focused, href })}</View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    paddingTop: 8,
    paddingBottom: 0,
    backgroundColor: COLORS.secondaryBlack,
  },
});
