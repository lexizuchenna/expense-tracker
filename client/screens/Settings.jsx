import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useMainContext } from "../context/MainContext";
import { COLORS } from "../constants/theme";
import gStyles from "../styles/styles";

const Settings = () => {
  const { navigate } = useNavigation();
  const { user, setUser } = useMainContext();

  const [isAvailable, setIsAvailable] = useState(false);
  const [isBiometrics, setIsBiometrics] = useState(user.isBiometrics);

  async function authenticateBiometrics() {
    if (user.isBiometrics) {
      setUser((prev) => ({ ...prev, isBiometrics: false }));

      const newSetting = user;
      user.isBiometrics = false;

      await SecureStore.setItemAsync("user", JSON.stringify(newSetting));
      return setIsBiometrics(false);
    }

    if (!isAvailable)
      return ToastAndroid.show("Biometrics not available", ToastAndroid.SHORT);

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Verify Biometrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (result.success) {
      try {
        const newSetting = user;

        user.isBiometrics = true;

        await SecureStore.setItemAsync("user", JSON.stringify(newSetting));

        setUser((prev) => ({ ...prev, isBiometrics: true }));
        setIsBiometrics(true);
      } catch (error) {
        console.log("set-biometrics: ", error);
        const message =
          error?.response?.data?.message ||
          error?.response?.data ||
          error?.message ||
          "Internal server error";

        if (message === "Password incorrect") {
          return ToastAndroid.show("Login with password", ToastAndroid.SHORT);
        }

        console.log(error);
        console.log(message);

        return ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      const biometryType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (compatible && biometryType.length > 0) {
        setIsAvailable(true);
      }
    })();
  }, []);

  return (
    <View style={gStyles.container()}>
      <StatusBar backgroundColor={COLORS.light100} />
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.flexRow, { paddingVertical: 20 }]}
          onPress={() => navigate("password")}
        >
          <Text style={{ fontFamily: "medium", fontSize: 17 }}>
            Change Password
          </Text>
          <Image
            source={require("../assets/images/arrow-right.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flexRow, { paddingVertical: 20 }]}
          onPress={() => navigate("change-pin")}
        >
          <Text style={{ fontFamily: "medium", fontSize: 17 }}>
            Change Login PIN
          </Text>

          <Image
            source={require("../assets/images/arrow-right.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
        <View style={[styles.flexRow, { paddingVertical: 20 }]}>
          <Text style={{ fontFamily: "medium", fontSize: 17 }}>
            Use Biometrics
          </Text>
          <Switch
            trackColor={{ false: COLORS.green20, true: COLORS.green80 }}
            thumbColor={isBiometrics ? COLORS.blue100 : COLORS.blue500}
            onValueChange={authenticateBiometrics}
            value={isBiometrics}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 20,
    borderTopColor: COLORS.light40,
    borderTopWidth: 1,
  },
  flexRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
