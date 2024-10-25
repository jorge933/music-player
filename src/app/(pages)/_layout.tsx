import { COLORS } from "@/constants/Colors";
import { Tabs } from "expo-router";
import Header from "../components/Header/Header";
import TabBarButton from "../components/TabBarButton/TabBarButton";

export default function TabLayout() {
  const hideTabs = {
    tabBarStyle: {
      display: "none" as "none",
    },
    href: null,
  };

  return (
    <Tabs
      screenOptions={{
        lazy: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: COLORS.secondaryBlack,
          display: "flex",
          borderWidth: 0,
        },
        tabBarItemStyle: {
          width: 20,
          marginHorizontal: 50,
        },
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}
      sceneContainerStyle={{ backgroundColor: COLORS.black }}
    >
      <Tabs.Screen
        name="library/library"
        options={{
          header: () => <Header title="Your Library" />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton
              focused={focused}
              title="Library"
              iconName="library"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library/musics"
        options={{
          header: () => <Header title="Your Musics" backButton />,
          ...hideTabs,
        }}
      />
      <Tabs.Screen
        name="(search)/index"
        options={{
          header: () => <Header title="Search" />,
          tabBarIcon: ({ focused }) => (
            <TabBarButton focused={focused} title="Search" iconName="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="(search)/results"
        options={{
          header: () => <Header title="Results" backButton />,
          ...hideTabs,
        }}
      />
    </Tabs>
  );
}
