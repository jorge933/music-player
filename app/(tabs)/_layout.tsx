import { COLORS } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Header } from "@/components/Header/Header";
import { TabBarButton } from "@/components/TabBarButton/TabBarButton";

export default function TabLayout() {
  const hideTabs = {
    tabBarStyle: {
      height: 0,
      borderTopWidth: 0,
    },
    href: null,
  };

  const generateHeader = (title: string, backButton?: boolean) => {
    return <Header title={title} backButton={!!backButton} />;
  };

  const generateTabBarButton = (
    title: string,
    iconName: string,
    href?: string,
  ) => {
    return <TabBarButton title={title} iconName={iconName} href={href} />;
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
          header: () => generateHeader("Your Library"),
          tabBarButton: ({ href }) =>
            generateTabBarButton("Library", "library", href),
        }}
      />
      <Tabs.Screen
        name="library/musics"
        options={{
          header: () => generateHeader("Your Musics", true),
          ...hideTabs,
        }}
      />
      <Tabs.Screen
        name="library/playlist"
        options={{
          header: () => generateHeader("", true),
          ...hideTabs,
        }}
      />
      <Tabs.Screen
        name="(search)/index"
        options={{
          header: () => generateHeader("Search"),
          tabBarButton: ({ href }) =>
            generateTabBarButton("Search", "search", href),
        }}
      />
      <Tabs.Screen
        name="(search)/results"
        options={{
          header: () => generateHeader("Results", true),
          ...hideTabs,
        }}
      />
    </Tabs>
  );
}
