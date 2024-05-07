import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { useMainContext } from "../../context/MainContext";

import { COLORS } from "../../constants/theme";
import gStyles from "../../styles/styles";

import Loader from "../../components/Loader";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const { url } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  return (
    <View style={gStyles.container(COLORS.light100)}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Don’t worry.</Text>
        <View>
          <Text style={styles.text}>
            Enter your email and we’ll send you a link to reset your password.
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={gStyles.input}
          placeholderTextColor={COLORS.light20}
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(email) => setFormData({ email })}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={gStyles.btn()}
          onPress={() => navigation.navigate("email-sent")}
        >
          <Text style={gStyles.btnText()}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={isLoading} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 46,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textContainer: {
    marginTop: 44,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: "semi-bold",
    fontSize: 24,
  },
});
