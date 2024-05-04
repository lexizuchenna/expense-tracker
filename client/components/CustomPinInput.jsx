import { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";
import { COLORS } from "../constants/theme";

const CustomPinInput = ({ pinLength, onComplete }) => {
  const [pin, setPin] = useState(Array(pinLength).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move focus to the next input if available
    if (value.length === 1 && index < pinLength - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If pin length reaches the required length, call onComplete callback
    if (newPin.join("").length === pinLength) {
      Keyboard.dismiss();
      onComplete(newPin.join(""));
    }
  };

  const handleBackspace = (index) => {
    const newPin = [...pin];
    newPin[index] = "";
    setPin(newPin);

    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderInputs = () => {
    return pin.map((value, index) => (
      <TextInput
        ref={(ref) => (inputRefs.current[index] = ref)}
        key={index}
        style={styles.input}
        value={value}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={(text) => handleChange(text, index)}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspace(index);
          }
        }}
        caretHidden
      />
    ));
  };

  return <View style={styles.container}>{renderInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignSelf: "center",
  },
  input: {
    width: 35,
    height: 35,
    borderRadius: 20, // round the input
    textAlign: "center",
    fontSize: 20,
    color: COLORS.light100,
    backgroundColor: COLORS.blue200,
    marginRight: 18,
    fontFamily: "bold",
  },
});

export default CustomPinInput;
