import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { useMainContext } from "../context/MainContext";
import { COLORS } from "../constants/theme";

const Action = () => {
  const { setIsAction } = useMainContext();
  const navigation = useNavigation();

  const btn = [
    {
      type: "income",
      img: require(`../assets/images/income.png`),
      bg: COLORS.green100,
    },
    {
      type: "expense",
      img: require(`../assets/images/expense.png`),
      bg: COLORS.red100,
    },
  ];

  function handlePress(type) {
    navigation.navigate("add-transaction", { type, mode: "new" });
    return setIsAction((prev) => !prev);
  }
  return (
    <View style={styles.overlay}>
      <LinearGradient
        colors={["rgba(0, 119, 255, 0.2)", "rgba(0, 119, 255, 0.8)"]}
        style={styles.overlay}
      >
        <View
          style={{ position: "absolute", bottom: 130, flexDirection: "row" }}
        >
          {btn.map((b) => (
            <TouchableOpacity
              style={styles.btn(b.bg)}
              key={b.type}
              onPress={() => handlePress(b.type)}
            >
              <Image
                style={{ width: 40, height: 40, resizeMode: "contain" }}
                source={b.img}
              />
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  btn: (bg) => ({
    backgroundColor: bg,
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 40,
  }),
});
