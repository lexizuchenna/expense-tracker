import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import { MainContext } from "./context/MainContext";
import { COLORS } from "./constants/theme";
import Main from "./Main";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = Font.useFonts({
    regular: Inter_400Regular,
    medium: Inter_500Medium,
    "semi-bold": Inter_600SemiBold,
    bold: Inter_700Bold,
    "extra-bold": Inter_800ExtraBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          setIsAppReady(true);
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!isAppReady) return null;

  return (
    <MainContext>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </MainContext>
  );
}
