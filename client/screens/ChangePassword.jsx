import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ScrollView,
  StatusBar,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import gStyles from "../styles/styles";
import { useMainContext } from "../context/MainContext";
import { COLORS } from "../constants/theme";

import Loader from "../components/Loader";

const ChangePassword = () => {
  const navigation = useNavigation();

  const { url, setUser } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState({
    old_password: false,
    password: false,
    password2: false,
  });
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password2: "",
  });

  const handleChangePassword = async () => {
    if (Object.values(formData).includes("")) {
      return ToastAndroid.show("Enter all fields", ToastAndroid.SHORT);
    }
    try {
      setIsLoading(true);
      const { data } = await url.post("/password", formData);

      ToastAndroid.show(data.message, ToastAndroid.SHORT);

      if (data.status === 200) {
        const { password } = data;
        const user = JSON.parse(await SecureStore.getItemAsync("user"));
        user.password = password;

        await SecureStore.setItemAsync("user", JSON.stringify(user));
        setUser((prev) => ({ ...prev, password }));

        return navigation.goBack();
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

  function handleShowPwd(name) {
    setShowPwd((p) => ({ ...p, [name]: !p[name] }));
  }

  const inputs = [
    { name: "old_password", placeholder: "Current Password" },
    { name: "password", placeholder: "New Password" },
    { name: "password2", placeholder: "Confirm Password" },
  ];

  return (
    <View style={gStyles.container()}>
      <StatusBar backgroundColor={COLORS.light100} />
      <ScrollView>
        <View style={styles.inputContainer}>
          {inputs.map((input) => (
            <View style={gStyles.inputWrapper} key={input.name}>
              <TextInput
                placeholder={input.placeholder}
                style={gStyles.inputAlt}
                placeholderTextColor={COLORS.light20}
                secureTextEntry={!showPwd[input.name]}
                value={formData[input.name]}
                autoCapitalize="none"
                keyboardType={
                  !showPwd[input.name] ? "default" : "visible-password"
                }
                onChangeText={(t) =>
                  setFormData((p) => ({ ...p, [input.name]: t }))
                }
              />
              <TouchableOpacity
                style={gStyles.inputIcon}
                onPress={() => handleShowPwd(input.name)}
              >
                <Octicons
                  name={showPwd[input.name] ? "eye" : "eye-closed"}
                  size={21}
                  color={COLORS.light20}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={gStyles.btn()}
            onPress={handleChangePassword}
          >
            <Text style={gStyles.btnText()}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoading} />
    </View>
  );
};

export default ChangePassword;

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
