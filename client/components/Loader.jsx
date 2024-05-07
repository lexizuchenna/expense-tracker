import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const Loader = ({ visible }) => {
  if (!visible) return null;

  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const growAnimation = Animated.timing(scaleValue, {
      toValue: 1.5,
      duration: 500,
      useNativeDriver: true,
    });

    const shrinkAnimation = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    const loopAnimation = Animated.sequence([growAnimation, shrinkAnimation]);

    const loop = () => {
      Animated.loop(loopAnimation).start();
    };

    loop();

    return () => {
      scaleValue.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.Image
        source={require("../assets/icon.png")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          transform: [{ scale: scaleValue }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
});

export default Loader;
