import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomTabBarPros, TabBarButton } from "./CustomTabBar.types";

export function CustomTabBar({
  state: { routes, index: focusedIndex },
  descriptors,
  keyboardIsActive: keyboardActive,
}: CustomTabBarPros) {
  if (keyboardActive) return null;

  const tabBarExternalStyles = routes.reduce(
    (prev: unknown, { key }, currentIndex) => {
      if (currentIndex === focusedIndex) {
        const { options } = descriptors[key];

        return options.tabBarStyle;
      }

      return prev;
    },
    {},
  );

  return (
    <View style={[styles.tabBar, tabBarExternalStyles || {}]}>
      {routes.map(({ key }, currentIndex) => {
        const { options, route } = descriptors[key];
        const tabBarButton = options.tabBarButton as TabBarButton;

        if (!tabBarButton) return;

        const href = `/(tabs)/${route.name}`.replace("index", "");
        const focused = focusedIndex === currentIndex;
        return (
          <TouchableOpacity key={route.key}>
            {tabBarButton({ focused, href })}
          </TouchableOpacity>
        );
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
