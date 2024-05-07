import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, SIZES } from "../constants/theme";
import { useEffect, useRef } from "react";

const PopAction = ({ visible, onComplete, onCancel, headText, bodyText }) => {
  if (!visible) return null;

  const translateYValue = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.spring(translateYValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const btn = [
    {
      text: "No",
      bg: COLORS.blue500,
      color: COLORS.blue100,
    },
    {
      text: "Yes",
      bg: COLORS.blue100,
      color: COLORS.light100,
    },
  ];

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateY: translateYValue }],
          },
        ]}
      >
        <View style={styles.line}></View>
        <Text style={styles.cardText}>{headText}</Text>
        <Text style={[styles.cardText, { color: COLORS.light20 }]}>
          {bodyText}
        </Text>
        <View style={styles.btnContainer}>
          {btn.map((b) => (
            <TouchableOpacity
              style={styles.btn(b.bg)}
              key={b.text}
              onPress={b.text === "Yes" ? onComplete : onCancel}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  color: b.color,
                  fontSize: 18,
                }}
              >
                {b.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default PopAction;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  btn: (bg) => ({
    backgroundColor: bg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: SIZES.width / 2 - 30,
  }),
  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: SIZES.width,
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.light100,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: COLORS.blue300,
    marginBottom: 20,
    borderRadius: 2,
    marginTop: 5,
  },
  cardText: {
    fontFamily: "semi-bold",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: SIZES.width - 40,
  },
});
