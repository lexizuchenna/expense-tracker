import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants/theme";

const input = {
  borderWidth: 1,
  borderRadius: 9,
  borderColor: COLORS.light40,
  paddingVertical: 13,
  marginVertical: 12,
  paddingHorizontal: 10,
  width: SIZES.width - 40,
};

const gStyles = StyleSheet.create({
  container: (color) => ({
    flex: 1,
    backgroundColor: color ? color : COLORS.light100,
  }),
  btn: (color) => ({
    width: SIZES.width - 40,
    backgroundColor: color ? color : COLORS.blue100,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
  }),
  btnText: (color) => ({
    fontFamily: "bold",
    color: color ? color : COLORS.light100,
    fontSize: 16,
  }),
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...input,
  },
  inputAlt: {
    width: SIZES.width - 80,
    fontFamily: "medium",
  },
  inputIcon: { justifyContent: "center", alignItems: "center" },
  input: {
    fontFamily: "medium",
    ...input,
  },

  trxContainer: {
    flex: 1,
    backgroundColor: COLORS.bgSecondary,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 40,
    paddingTop: 20,
    elevation: 4,
  },
});

export default gStyles;
