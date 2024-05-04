import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import { useState } from "react";

import { useMainContext } from "../../context/MainContext";

import Loader from "../../components/Loader";
import AuthHeader from "../../components/headers/AuthHeader";

import { COLORS } from "../../constants/theme";
import gStyles from "../../styles/styles";
import TransactionCard from "../../components/cards/TransactionCard";
import Action from "../../components/Action";

const Profile = () => {
  const { url1, setUser, user, isAction } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phone_number: user?.phone_number,
    password: "",
  });

  const transactions = [
    {
      category: "shopping",
      desc: "Bought her a bag",
      amount: "1000",
      date: "2003-02-20",
    },
    {
      category: "food",
      desc: "Bought her a bag",
      amount: "1000",
      date: "2024-02-12",
    },
    {
      category: "subscription",
      desc: "MTN Subscription",
      amount: "1000",
      date: "2033-02-12",
    },
    {
      category: "credit",
      desc: "Salary for Dec",
      amount: "1000",
      date: "2023-02-14",
    },
    {
      category: "shopping",
      desc: "Bought her a bag",
      amount: "1000",
      date: "2003-02-20",
    },
    {
      category: "food",
      desc: "Bought her a bag",
      amount: "1000",
      date: "2024-02-12",
    },
    {
      category: "subscription",
      desc: "MTN Subscription",
      amount: "1000",
      date: "2033-02-12",
    },
    {
      category: "credit",
      desc: "Salary for Dec",
      amount: "1000",
      date: "2023-02-14",
    },
    {
      category: "subscription",
      desc: "MTN Subscription",
      amount: "1000",
      date: "2033-02-12",
    },
    {
      category: "credit",
      desc: "Salary for Dec",
      amount: "1000",
      date: "2023-02-14",
    },
  ];

  return (
    <View style={gStyles.container()}>
      <StatusBar
        backgroundColor={isAction ? "rgba(0, 119, 255, 0.2)" : COLORS.light100}
        barStyle="dark-content"
      />
      <AuthHeader text="All Transactions" />
      <View style={{ paddingBottom: 150 }}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, i) => i}
        />
      </View>
      {isAction && <Action />}
      <Loader visible={isLoading} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
