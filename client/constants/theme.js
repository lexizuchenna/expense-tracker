import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const COLORS = {
  blue100: "#0077FF",
  blue200: "#248AFF",
  blue300: "#57A5FF",
  blue400: "#8AC0FF",
  blue500: "#BDDCFF",

  light100: "#FFFFFF",
  light80: "#FCFCFC",
  light60: "#F1F1FA",
  light40: "#E3E5E5",
  light20: "#91919F",

  dark100: "#0D0E0F",
  dark75: "#161719",
  dark50: "#212325",
  dark25: "#292B2D",

  red100: "#FD3C4A",
  red80: "#FD5662",
  red60: "#FD6F7A",
  red40: "#FDA2A9",
  red20: "#FDD5D7",

  green100: "#00a86b",
  green80: "#2AB784",
  green60: "#2AB784",
  green40: "#2AB784",
  green20: "#CFFAEA",

  yellow20: "#FCEED4",

  purple20: "#EEE5FF",
};

const SIZES = {
  height,
  width,
};

export { COLORS, SIZES };
