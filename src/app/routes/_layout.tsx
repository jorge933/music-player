import { DownloadSongProvider } from "@/components/DownloadSongProvider/DownloadSongProvider";
import { SongPlayerControlProvider } from "@/components/SongPlayerControlProvider/SongPlayerControlProvider";
import { ToastsProvider } from "@/components/ToastsProvider/ToastsProvider";
import { COLORS } from "@/constants/Colors";
import { Inter_400Regular, Inter_900Black } from "@expo-google-fonts/inter";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { enableScreens } from "react-native-screens";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../../../tamagui.config";

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

  Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    shouldDuckAndroid: false,
  });

  setStatusBarBackgroundColor(COLORS.black, false);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ToastsProvider>
        <DownloadSongProvider>
          <SongPlayerControlProvider>
            <Stack
              screenOptions={{
                orientation: "portrait_up",
                contentStyle: { backgroundColor: COLORS.black },
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
          </SongPlayerControlProvider>
        </DownloadSongProvider>
      </ToastsProvider>
    </TamaguiProvider>
  );
}
