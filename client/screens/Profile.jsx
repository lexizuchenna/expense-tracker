import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";

import PopAction from "../components/PopAction";

import { useMainContext } from "../context/MainContext";
import { COLORS, SIZES } from "../constants/theme";
import gStyles from "../styles/styles";

const Profile = () => {
  const { user, handleLogout } = useMainContext();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [isLogout, setIsLogout] = useState(false);

  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  return (
    <View style={gStyles.container("#F6F6F6")}>
      <StatusBar backgroundColor="#F6F6F6" />
      <View
        style={{
          marginTop: topHeight,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          zIndex: 1,
        }}
      >
        <View
          style={{
            borderColor: COLORS.blue100,
            borderWidth: 2.5,
            borderRadius: 100,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: -10,
              bottom: 10,
              zIndex: 5,
              backgroundColor: COLORS.light100,
              borderRadius: 20,
              padding: 7,
            }}
          >
            <Octicons name="pencil" size={25} color={COLORS.blue100} />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/user.png")}
            style={styles.userIcon}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: "bold", fontSize: 30 }}>{user?.name}</Text>
        </View>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate("settings")}
        >
          <View style={styles.imageContainer(COLORS.blue500)}>
            <Image
              source={require("../assets/images/settings.png")}
              style={{ height: 40, width: 40 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.btnText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => setIsLogout(true)}
        >
          <View style={styles.imageContainer(COLORS.red20)}>
            <Image
              source={require("../assets/images/logout.png")}
              style={{ height: 40, width: 40 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <PopAction
        visible={isLogout}
        onCancel={() => setIsLogout(false)}
        onComplete={handleLogout}
        headText="Logout?"
        bodyText="Are you sure you want to logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userIcon: {
    width: 130,
    height: 130,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: (bg) => ({
    backgroundColor: bg,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 15,
  }),
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  btns: {
    backgroundColor: COLORS.light100,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  logout: {
    backgroundColor: COLORS.light100,
    borderRadius: 20,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 10,
    width: SIZES.width - 40,
  },
  btnText: {
    fontFamily: "semi-bold",
    marginRight: 20,
    flex: 1,
    fontSize: 17,
  },
});

export default Profile;
