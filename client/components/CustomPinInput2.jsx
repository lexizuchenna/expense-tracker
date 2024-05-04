import { View, StyleSheet } from "react-native";

import { COLORS } from "../constants/theme";

const CustomPinInput2 = ({ pinLength, index }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: pinLength }).map((_, i) => (
        <View style={styles.input(i, index)} key={i}></View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: (i, index) => ({
    width: 35,
    height: 35,
    borderRadius: 20, // round the input
    backgroundColor: !index.some((ind) => ind === i)
      ? COLORS.blue200
      : COLORS.light100,
    borderWidth: 1.8,
    borderColor: COLORS.light100,
    marginHorizontal: 9,
  }),
});

export default CustomPinInput2;
