import * as SecureStore from "expo-secure-store";
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
import { COLORS } from "../../constants/theme";

import Loader from "../../components/Loader";

const Login = () => {
  const navigation = useNavigation();

  const { url, setUser, setIsLogin } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    if (Object.values(formData).includes("")) {
      return ToastAndroid.show("Enter all fields", ToastAndroid.SHORT);
    }
    try {
      setIsLoading(true);
      const { data } = await url.post("/login", formData);

      ToastAndroid.show(data.message, ToastAndroid.SHORT);

      if (data.status === 403) {
        if (data.message === "Account not verified") {
          const { data } = await url.get(`/get-code?email=${formData.email}`);
          const { token, user } = data;

          return navigation.navigate("verification", {
            data: { user, token, t: 0 },
          });
        }
        return ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }

      if (data.status === 200) {
        const { user } = data;
        user.isBiometrics = false;
        user.passCode = null;
        await SecureStore.setItemAsync("user", JSON.stringify(user));
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
  }

  useEffect(() => {
    (async () => {
      const user = await SecureStore.getItemAsync("user");

      if (!user) return;

      const { email } = JSON.parse(user);

      setFormData((prev) => ({ ...prev, email }));
    })();
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
            value={formData.email}
            onChangeText={(email) => setFormData((p) => ({ ...p, email }))}
          />
          <View style={gStyles.inputWrapper}>
            <TextInput
              placeholder="Password"
              style={gStyles.inputAlt}
              placeholderTextColor={COLORS.light20}
              secureTextEntry={!showPwd}
              keyboardType={!showPwd ? "default" : "visible-password"}
              value={formData.password}
              onChangeText={(password) =>
                setFormData((p) => ({ ...p, password }))
              }
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
          <TouchableOpacity style={gStyles.btn()} onPress={handleLogin}>
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
