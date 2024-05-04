import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import gStyles from "../../styles/styles";
import { COLORS } from "../../constants/theme";

const EmailSent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  return (
    <>
      <StatusBar backgroundColor={COLORS.light100} barStyle="dark-content" />
      <View style={[gStyles.container(), { paddingTop: topHeight }]}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/email-sent.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>Your email is on the way</Text>
            <Text style={styles.text2}>
              Check your email test@test.com and follow the instructions to
              reset your password
            </Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={gStyles.btn()}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={gStyles.btnText()}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default EmailSent;

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
    marginHorizontal: 40,
    marginTop: 20,
  },
  text1: {
    fontFamily: "bold",
    color: COLORS.dark50,
    textAlign: "center",
    fontSize: 28,
  },
  text2: {
    fontFamily: "medium",
    color: COLORS.light20,
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
});
