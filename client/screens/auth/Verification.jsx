import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { useMainContext } from "../../context/MainContext";

import { COLORS } from "../../constants/theme";
import gStyles from "../../styles/styles";

import Loader from "../../components/Loader";
import CustomPinInput from "../../components/CustomPinInput";

const Verification = () => {
  const navigation = useNavigation();

  const { url2 } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(300000);
  const [pin, setPin] = useState("");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) return prev - 1000;
        else {
          clearInterval(timeInterval); // Clear the interval when time reaches 0
          return prev;
        }
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timeInterval);
  }, [time]);

  const formatTime = () => {
    const totalSeconds = Math.floor(time / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format the time
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return formattedTime;
  };

  return (
    <View style={gStyles.container(COLORS.light100)}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: 36 }]}>
          Enter your Verification Code
        </Text>
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 47 }}>
        <CustomPinInput pinLength={6} onComplete={(p) => setPin(p)} />
      </View>
      <View style={[styles.textContainer, { marginTop: 0 }]}>
        <Text style={[styles.text, { fontSize: 16, fontFamily: "medium" }]}>
          We sent a verification code to your email{" "}
          <Text style={{ color: COLORS.blue100 }}>
            brajaoma*****@gmail.com.
          </Text>{" "}
          You can check your inbox.
        </Text>
      </View>
      <View style={[styles.textContainer, { marginTop: 30 }]}>
        <TouchableOpacity onPress={() => setTime(() => 300000)}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 16,
                fontFamily: "medium",
                color: COLORS.blue100,
                marginBottom: 20,
                textDecorationLine: time > 0 ? "none" : "underline",
              },
            ]}
          >
            {time > 0 ? formatTime() : "I didn't receive the code? Send again"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={gStyles.btn()}
          onPress={() => navigation.navigate("email-sent")}
        >
          <Text style={gStyles.btnText()}>Verify</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={isLoading} />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 46,
  },
  btnContainer: {
    alignItems: "center",
  },
  textContainer: {
    marginTop: 44,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: "semi-bold",
    fontSize: 24,
    // color: COLORS.light20,
  },
});
