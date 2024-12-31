import { COLORS } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Header } from "@/components/Header/Header";
import { TabBarButton } from "@/components/TabBarButton/TabBarButton";
import { CustomTabBar } from "@/components/CustomTabBar/CustomTabBar";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const [keyboardActive, setKeyboardActive] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardActive(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardActive(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
    focused: boolean,
    href?: string,
  ) => {
    return (
      <TabBarButton
        title={title}
        iconName={iconName}
        href={href}
        focused={focused}
      />
    );
  };

  return (
    <Tabs
      tabBar={(props) => CustomTabBar({ ...props, keyboardActive })}
      screenOptions={{
        lazy: true,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: COLORS.black },
        animation: "shift",
      }}
      backBehavior="history"
      initialRouteName="index"
    >
      <Tabs.Screen
        name="library"
        options={{
          header: () => generateHeader("Your Library"),
          tabBarButton: ({ href, focused }: any) =>
            generateTabBarButton("Library", "library", focused, href),
        }}
      />
      <Tabs.Screen
        name="musics"
        options={{
          header: () => generateHeader("Your Musics", true),
          ...hideTabs,
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          header: () => generateHeader("", true),
          ...hideTabs,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          header: () => generateHeader("Search"),
          tabBarButton: ({ href, focused }: any) =>
            generateTabBarButton("Search", "search", focused, href),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          header: () => generateHeader("Results", true),
          ...hideTabs,
        }}
      />
    </Tabs>
  );
}
