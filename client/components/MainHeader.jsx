import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS, SIZES } from "../constants/theme";

const MainHeader = () => {
  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  return (
    <View style={styles["header-container"]}>
      <View style={[styles["main-header"], { marginTop: topHeight }]}></View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  "header-container": {
    backgroundColor: COLORS.bg3,
  },
  "main-header": {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
