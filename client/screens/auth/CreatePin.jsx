import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CustomPinInput2 from "../../components/CustomPinInput2";

import gStyles from "../../styles/styles";
import { COLORS, SIZES } from "../../constants/theme";

const CreatePin = () => {
  const navigation = useNavigation("");
  const [inputs, setInputs] = useState("");
  const [index, setIndex] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [isDone, setIsDone] = useState(false);

  const pins = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

  console.log("inp", inputs);
  console.log("fir", first);
  console.log("sec", second);

  useEffect(() => {
    console.log(inputs);
    if (inputs.length === 4) {
      if (!first) {
        setFirst(inputs);
        setIndex([]);
        return setInputs("");
      } else {
        setSecond(inputs);
      }
    }
  }, [inputs]);

  useEffect(() => {
    if (first && second) {
      if (first === second) return setIsDone(true);
      else {
        setIndex([]);
        setInputs("");
        setFirst("");
        setSecond("");
      }
    }
  }, [first, second]);

  useEffect(() => {
    if (isDone)
      setTimeout(() => {
        navigation.navigation("");
      }, 3000);
  }, [isDone]);

  const handleInputPress = (input) => {
    if (input === "") return;

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
  };
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
              {!first ? "Let’s setup your PIN" : "Re type your PIN again"}
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
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              position: "absolute",
              bottom: 20,
            }}
          >
            {pins.map((p) => (
              <TouchableOpacity
                style={{
                  width: SIZES.width / 3,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
                onPress={() => handleInputPress(p)}
                key={p}
              >
                {p === "back" ? (
                  <View>
                    <Ionicons
                      name="backspace"
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
        </>
      )}
    </View>
  );
};

export default CreatePin;

const styles = StyleSheet.create({});
