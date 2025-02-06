import { BottomTabs } from "@/components/BottomTabs/BottomTabs";
import { CustomTabBar } from "@/components/CustomTabBar/CustomTabBar";
import { Header } from "@/components/Header/Header";
import { COLORS } from "@/constants/Colors";
import { generateTabBarButton } from "@/helpers/generateTabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";

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
      paddingTop: 0,
    },
    href: null,
  };

  const generateHeader = (title: string, backButton?: boolean) => {
    return <Header title={title} backButton={!!backButton} />;
  };

  const generateComponents = (props: BottomTabBarProps) => [
    <CustomTabBar {...props} keyboardIsActive={keyboardActive} />,
  ];

  return (
    <Tabs
      tabBar={(props) => (
        <BottomTabs
          components={generateComponents(props)}
          keyboardIsActive={keyboardActive}
        />
      )}
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
        name="download-manager"
        options={{
          header: () => generateHeader("Downloads"),
          tabBarButton: ({ href, focused }: any) =>
            generateTabBarButton("Downloads", "cloud-download", focused, href),
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
