import { COLORS } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Header } from "../components/Header/Header";
import { TabBarButton } from "../components/TabBarButton/TabBarButton";

export default function TabLayout() {
  const hideTabs = {
    tabBarStyle: {
      height: 0,
      borderTopWidth: 0,
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
          alignItems: "center",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          maxWidth: 70,
          display: "flex",
          marginTop: "auto",
          marginHorizontal: 50,
          borderRadius: 50,
        },
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: COLORS.black },
        animation: "shift",
      }}
      backBehavior="history"
      initialRouteName="(search)/index"
    >
      <Tabs.Screen
        name="library/library"
        options={{
          header: () => <Header title="Your Library" />,
          tabBarButton: ({ href }) => (
            <TabBarButton href={href} title="Library" iconName="library" />
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
        name="library/playlist"
        options={{
          header: () => <Header title="" backButton />,
          ...hideTabs,
        }}
      />
      <Tabs.Screen
        name="(search)/index"
        options={{
          header: () => <Header title="Search" />,
          tabBarButton: ({ href }) => (
            <TabBarButton href={href} title="Search" iconName="search" />
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
