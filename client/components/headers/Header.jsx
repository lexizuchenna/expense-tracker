import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../constants/theme";

const Header = ({ color, text, bg }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;
  return (
    <View style={styles.headerContainer(bg, topHeight)}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color={color ? color : "#000"}
        />
      </TouchableOpacity>
      <Text style={styles.headerText(color)}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: (bg, height) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginTop: height,
    marginBottom: 20,
    backgroundColor: bg ? bg : COLORS.light100,
  }),
  backButton: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 10,
  },
  headerText: (color) => ({
    fontSize: 18,
    fontFamily: "semi-bold",
    color: color ? color : "#000",
  }),
});

export default Header;
