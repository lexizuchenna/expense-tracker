import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import { MainContext } from "./context/MainContext";
import Main from "./Main";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [isFontReady, setIsFontReady] = useState(false);
  const [isUserReady, setIsUserReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

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
        if (fontsLoaded && isUserReady) {
          await SplashScreen.hideAsync();
        }

        if (fontsLoaded) {
          setIsFontReady(true);
        }

        const user = await SecureStore.getItemAsync("user");

        if (user) {
          setUser(JSON.parse(user));
          setIsLogin(true);
        }

        setIsUserReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded, isUserReady]);

  if (!isFontReady || !isUserReady) return null;

  return (
    <MainContext>
      <NavigationContainer>
        <Main getLogin={isLogin} getUser={user} />
      </NavigationContainer>
    </MainContext>
  );
}
