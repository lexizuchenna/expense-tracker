import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons, Ionicons } from "@expo/vector-icons";

import Loader from "../../components/Loader";

import { useMainContext } from "../../context/MainContext";
import { COLORS, SIZES } from "../../constants/theme";
import gStyles from "../../styles/styles";

const SignUp = () => {
  const navigation = useNavigation();
  const { url } = useMainContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleRegister = async () => {
    if (Object.values(formData).includes(""))
      return ToastAndroid.show("Enter all fields", ToastAndroid.SHORT);

    if (!isCheck)
      return ToastAndroid.show(
        "You must agree to the terms",
        ToastAndroid.SHORT
      );

    try {
      setIsLoading(true);
      const { data } = await url.post("/signup", formData);

      if (data.status === 201) {
        const { token, user } = data;
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return navigation.navigate("verification", {
          data: { user, token, t: 300000 },
        });
      }
    } catch (error) {
      console.log("signup: ", error);
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

  return (
    <View style={gStyles.container(COLORS.light100)}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            style={gStyles.input}
            placeholderTextColor={COLORS.light20}
            value={formData.name}
            onChangeText={(name) => setFormData((prev) => ({ ...prev, name }))}
          />
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
                setFormData((prev) => ({ ...prev, password }))
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
        <View style={styles.terms}>
          <TouchableOpacity onPress={() => setIsCheck((p) => !p)}>
            <View style={styles.checkbox}>
              {isCheck && (
                <Ionicons
                  name="checkbox"
                  size={26}
                  style={{
                    marginTop: -4,
                    marginLeft: -2,
                  }}
                  color={COLORS.blue100}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.termsText}>
              By signing up, you agree to the{" "}
              <Text style={{ color: COLORS.blue100 }}>
                Terms of Service and Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={gStyles.btn()} onPress={handleRegister}>
            <Text style={gStyles.btnText()}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.text}>
              Already have an account?{" "}
              <Text style={{ color: COLORS.blue100 }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 44,
  },
  terms: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.blue100,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    width: SIZES.width - 78,
    fontFamily: "semi-bold",
    fontSize: 13.5,
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

export default SignUp;
