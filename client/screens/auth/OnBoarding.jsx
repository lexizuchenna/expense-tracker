import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

import Pagination from "../../components/Pagination";

import gStyles from "../../styles/styles";
import { COLORS, SIZES } from "../../constants/theme";

const OnBoarding = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  const [index, setIndex] = useState(0);

  const contents = [
    {
      image: require("../../assets/images/onboarding01.png"),
      text1: "Gain total control of your money",
      text2: "Become your own money manager and make every cent count",
    },
    {
      image: require("../../assets/images/onboarding02.png"),
      text1: "Know where your money goes",
      text2:
        "Track your transaction easily, with categories and financial report",
    },
    {
      image: require("../../assets/images/onboarding03.png"),
      text1: "Planning ahead",
      text2: "Setup your budget for each category so you in control",
    },
  ];

  const buttons = [
    { screen: "signup", text: "Sign Up", color: undefined, bg: undefined },
    {
      screen: "login",
      text: "Login",
      color: COLORS.blue100,
      bg: COLORS.blue500,
    },
  ];

  return (
    <>
      <StatusBar backgroundColor={COLORS.light100} barStyle="dark-content" />
      <View style={[gStyles.container(), { paddingTop: topHeight }]}>
        <View style={{ height: 530 }}>
          <Swiper
            showsPagination={false}
            onIndexChanged={(i) => setIndex(i)}
            scrollEnabled={false}
            autoplayTimeout={3}
            autoplay
          >
            {contents.map((content, i) => (
              <View key={i}>
                <View style={styles.imageContainer}>
                  <Image source={content.image} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text1}>{content.text1}</Text>
                  <Text style={styles.text2}>{content.text2}</Text>
                </View>
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{ marginTop: 20 }}>
          <Pagination items={contents} currentIndex={index} />
        </View>
        <View style={styles.btnContainer}>
          {buttons.map((btn) => (
            <TouchableOpacity
              style={gStyles.btn(btn.bg)}
              onPress={() => navigation.navigate(btn.screen)}
              key={btn.screen}
            >
              <Text style={gStyles.btnText(btn.color)}>{btn.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
  },
  textContainer: {
    marginHorizontal: SIZES.width / 7,
    marginTop: 20,
  },
  text1: {
    fontFamily: "bold",
    color: COLORS.dark50,
    textAlign: "center",
    fontSize: 34,
  },
  text2: {
    fontFamily: "medium",
    color: COLORS.light20,
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
  },
  btnContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
});
