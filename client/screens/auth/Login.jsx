import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import gStyles from "../../styles/styles";
import { useMainContext } from "../../context/MainContext";
import { SIZES, COLORS } from "../../constants/theme";

import Loader from "../../components/Loader";

const Login = () => {
  const navigation = useNavigation();

  const { url1, setUser, setIsLogin } = useMainContext();

  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const authenticateBiometrics = async () => {
    if (!isAvailable)
      return ToastAndroid.show("Biometrics not available", ToastAndroid.SHORT);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Verify",
    });

    if (result.success) {
      try {
        setIsLoading(true);
        const credentials = await SecureStore.getItemAsync("user");
        if (!credentials)
          return ToastAndroid.show(
            "Login first to save credentials",
            ToastAndroid.SHORT
          );

        const { data } = await url1.post(
          "/accounts/login",
          JSON.parse(credentials)
        );

        if (data.status === 200) {
          setUser(data.user);

          setIsLogin(true);
          return navigate.navigate("main-navigation");
        }
      } catch (error) {
        console.log(": ", error);
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    if (Object.values(formData).includes("")) {
      return ToastAndroid.show("Input all fields", ToastAndroid.SHORT);
    }
    try {
      setIsLoading(true);
      const { data } = await url1.post("/accounts/login", formData);

      if (data.status === 200) {
        await SecureStore.setItemAsync("user", JSON.stringify(formData));
        setUser(data.user);

        setIsLogin(true);
      }
    } catch (error) {
      console.log("login: ", error);
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Internal server error";

      return ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCredentials = async () => {
      const user = await SecureStore.getItemAsync("user");

      if (!user) return;

      const { email } = JSON.parse(user);

      setFormData((prev) => ({ ...prev, email }));
    };
    const checkBiometrics = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      const biometryType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (compatible && biometryType.length > 0) {
        setIsAvailable(true);
      }
    };

    getCredentials();
    checkBiometrics();
  }, []);

  return (
    <View style={gStyles.container(COLORS.light100)}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={gStyles.input}
            placeholderTextColor={COLORS.light20}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={gStyles.inputWrapper}>
            <TextInput
              placeholder="Password"
              style={gStyles.inputAlt}
              placeholderTextColor={COLORS.light20}
              secureTextEntry={!showPwd}
              keyboardType={!showPwd ? "default" : "visible-password"}
            />
            <TouchableOpacity
              style={gStyles.inputIcon}
              onPress={() => setShowPwd((prev) => !prev)}
            >
              <Octicons
                name={showPwd ? "eye" : "eye-closed"}
                size={21}
                color={COLORS.light20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={gStyles.btn()} onPress={() => {}}>
            <Text style={gStyles.btnText()}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.textContainer, { marginBottom: 0 }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("forgot-password")}
          >
            <Text
              style={[styles.text, { color: COLORS.blue100, fontSize: 17 }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.text}>
              Don't have an account?{" "}
              <Text style={{ color: COLORS.blue100 }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoading} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 44,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontFamily: "semi-bold",
    fontSize: 16,
    color: COLORS.light20,
  },
});
