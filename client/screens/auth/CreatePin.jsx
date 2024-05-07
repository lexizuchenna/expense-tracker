import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CustomPinInput2 from "../../components/CustomPinInput2";
import PopAction from "../../components/PopAction";

import { useMainContext } from "../../context/MainContext";
import { COLORS, SIZES } from "../../constants/theme";
import gStyles from "../../styles/styles";

const CreatePin = ({ route }) => {
  const navigation = useNavigation();
  const { user, setUser, handleLogout, setIsLocked } = useMainContext();

  const [inputs, setInputs] = useState("");
  const [index, setIndex] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const { mode } = route.params;

  const pins = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "finger",
    "0",
    "back",
  ];

  useEffect(() => {
    if (inputs.length === 4) {
      if (mode === "locked") {
        if (user.passCode === inputs) return setIsLocked(false);

        ToastAndroid.show("Incorrect PIN, try again", ToastAndroid.SHORT);
        setIndex([]);
        setInputs("");
      } else {
        if (!first) {
          setFirst(inputs);
          setIndex([]);
          return setInputs("");
        } else {
          setSecond(inputs);
        }
      }
    }
  }, [inputs]);

  useEffect(() => {
    (async () => {
      if (first && second) {
        if (first === second) {
          const user = JSON.parse(await SecureStore.getItemAsync("user"));

          user.passCode = first;

          await SecureStore.setItemAsync("user", JSON.stringify(user));
          setUser((prev) => ({ ...prev, passCode: first }));

          if (mode === "change-pin") {
            ToastAndroid.show("PIN changed successfully", ToastAndroid.SHORT);
            return navigation.goBack();
          } else {
            setIsDone(true);
          }
        } else {
          ToastAndroid.show("PIN doesn't match, try again", ToastAndroid.SHORT);
          setIndex([]);
          setInputs("");
          setFirst("");
          setSecond("");
        }
      }
    })();
  }, [first, second]);

  useEffect(() => {
    if (isDone) {
      setIsLocked(false);
      setUser((prev) => ({ ...prev, passCode: first }));
      setTimeout(() => {
        navigation.navigate("main-navigation");
        navigation.reset({ index: 0, routes: [{ name: "main-navigation" }] });
      }, 3000);
    }
  }, [isDone]);

  async function handleInputPress(input) {
    if (input === "finger") {
      if (mode === "locked") {
        if (!user.isBiometrics) {
          return ToastAndroid.show(
            "Enable biometrics in setting",
            ToastAndroid.SHORT
          );
        }
      } else return;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify user",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        try {
          return setIsLocked(false);
        } catch (error) {
          console.log("unlock-biometrics: ", error);
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
      return;
    }

    if (input === "back") {
      if (inputs.length === 0) return;
      const newIndex = [...index];
      newIndex.pop();
      setIndex(newIndex);
      setInputs((prev) => prev.slice(0, prev.length - 1));
    } else {
      if (inputs.length === 4) return;
      const i = inputs.length;
      const newIndex = [...index];
      newIndex.push(i);
      setIndex(newIndex);
      setInputs((prev) => prev + input);
    }
  }

  return (
    <View
      style={[gStyles.container(isDone ? COLORS.light100 : COLORS.blue100)]}
    >
      <StatusBar backgroundColor={isDone ? COLORS.light100 : COLORS.blue100} />
      {isDone ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Ionicons
            name="checkmark-circle"
            size={100}
            color={COLORS.green100}
          />
          <Text style={{ fontSize: 24, fontFamily: "semi-bold" }}>
            You are set
          </Text>
        </View>
      ) : (
        <>
          <View style={{ marginTop: 44 }}>
            <Text
              style={{
                textAlign: "center",
                color: COLORS.light100,
                fontFamily: "semi-bold",
                fontSize: 18,
              }}
            >
              {mode === "locked"
                ? "Enter your PIN"
                : mode === "new-pin"
                ? !first
                  ? "Let’s setup your PIN"
                  : "Re type your PIN again"
                : !first
                ? "Type your new PIN"
                : "Re type your new PIN"}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <CustomPinInput2 pinLength={4} index={index} />
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {pins.map((p) => (
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleInputPress(p)}
                  key={p}
                >
                  {p === "back" || p === "finger" ? (
                    <View>
                      <Ionicons
                        name={p === "back" ? "backspace" : "finger-print"}
                        size={40}
                        color={COLORS.light100}
                      />
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "bold",
                        fontSize: 40,
                        textAlign: "center",
                        color: COLORS.light100,
                      }}
                    >
                      {p}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 5 }}
              onPress={() => setIsLogout(true)}
            >
              <Text style={styles.signOut}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <PopAction
        visible={isLogout}
        onCancel={() => setIsLogout(false)}
        onComplete={handleLogout}
        headText="Logout?"
        bodyText="Are you sure you want to logout"
      />
    </View>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  signOut: {
    fontFamily: "bold",
    fontSize: 20,
    color: COLORS.light100,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.light100,
    textAlign: "center",
  },
  key: {
    width: SIZES.width / 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
