import * as SecureStore from "expo-secure-store";
import { StyleSheet, View, StatusBar, FlatList } from "react-native";
import { useState } from "react";

import { useMainContext } from "../../context/MainContext";

import Loader from "../../components/Loader";
import AuthHeader from "../../components/headers/AuthHeader";

import { COLORS } from "../../constants/theme";
import gStyles from "../../styles/styles";
import TransactionCard from "../../components/cards/TransactionCard";
import Action from "../../components/Action";

const Transactions = () => {
  const { user, isAction, trxs } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={gStyles.container()}>
      <StatusBar
        backgroundColor={isAction ? "rgba(0, 119, 255, 0.2)" : COLORS.light100}
        barStyle="dark-content"
      />
      <AuthHeader text="All Transactions" />
      <View style={{ paddingBottom: 150, marginHorizontal: 20 }}>
        <FlatList
          data={trxs}
          renderItem={({ item, index }) => (
            <TransactionCard transaction={item} i={index} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, i) => i}
        />
      </View>
      {isAction && <Action />}
      <Loader visible={isLoading} />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
