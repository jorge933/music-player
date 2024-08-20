import { Tabs } from "expo-router";
import React from "react";
import Header from "../components/Header/Header";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <Header title="Home" backButton={true} />,
          title: "Home",
        }}
      />
    </Tabs>
  );
}
