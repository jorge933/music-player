import { Inter_400Regular, Inter_900Black } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { COLORS } from "./constants/Colors";
import { ToastsProvider } from "./components/ToastsProvider/ToastsProvider";
import { DownloadSongProvider } from "./components/DownloadSongProvider/DownloadSongProvider";

SplashScreen.preventAutoHideAsync();

enableScreens(true);

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    LatoLight: require("@assets/fonts/Lato/Lato-Light.ttf"),
    LatoRegular: require("@assets/fonts/Lato/Lato-Regular.ttf"),
    LatoSemiBold: require("@assets/fonts/Lato/Lato-Semi-Bold.ttf"),
    LatoBold: require("@assets/fonts/Lato/Lato-Bold.ttf"),
    LatoExtraBold: require("@assets/fonts/Lato/Lato-Extra-Bold.ttf"),
    LatoBlack: require("@assets/fonts/Lato/Lato-Black.ttf"),
    Inter: Inter_400Regular,
    InterBold: Inter_900Black,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  setStatusBarBackgroundColor(COLORS.black, false);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ToastsProvider>
        <DownloadSongProvider>
          <Stack
            screenOptions={{
              orientation: "portrait_up",
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </DownloadSongProvider>
      </ToastsProvider>
    </TamaguiProvider>
  );
}
