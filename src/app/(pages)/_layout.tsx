import { COLORS } from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import Header from "../components/Header/Header";
import TabBarButton from "../components/TabBarButton/TabBarButton";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: COLORS.secondaryBlack,
          display: "flex",
        },
        tabBarItemStyle: {
          width: 20,
          marginHorizontal: 50,
        },
        lazy: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <Header title="Home" backButton={true} />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton focused={focused} title="Home" />
          ),
        }}
      />
    </Tabs>
  );
}
