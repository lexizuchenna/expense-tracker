import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";

import Loader from "../components/Loader";

import { useMainContext } from "../context/MainContext";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { url } = useMainContext();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
