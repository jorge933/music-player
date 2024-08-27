import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LatoLight: require("../assets/fonts/Lato/Lato-Light.ttf"),
    LatoRegular: require("../assets/fonts/Lato/Lato-Regular.ttf"),
    LatoSemiBold: require("../assets/fonts/Lato/Lato-Semi-Bold.ttf"),
    LatoBold: require("../assets/fonts/Lato/Lato-Bold.ttf"),
    LatoExtraBold: require("../assets/fonts/Lato/Lato-Extra-Bold.ttf"),
    LatoBlack: require("../assets/fonts/Lato/Lato-Black.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        orientation: "portrait_up",
      }}
    >
      <Stack.Screen
        name="(pages)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
