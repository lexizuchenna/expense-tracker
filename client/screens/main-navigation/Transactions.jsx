import {
  View,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";

import Header from "../../components/headers/Header";
import TransactionCard from "../../components/cards/TransactionCard";
import Action from "../../components/Action";

import { useMainContext } from "../../context/MainContext";
import { COLORS } from "../../constants/theme";
import gStyles from "../../styles/styles";

const Transactions = () => {
  const { isAction, trxs, isTrxLoading } = useMainContext();

  return (
    <View style={gStyles.container()}>
      <StatusBar
        backgroundColor={isAction ? "rgba(0, 119, 255, 0.2)" : COLORS.light100}
        barStyle="dark-content"
      />
      <Header text="All Transactions" />
      <View style={{ paddingBottom: 150, marginHorizontal: 20 }}>
        {isTrxLoading ? (
          <View
            style={{
              minHeight: 220,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={COLORS.blue100} size="large" />
          </View>
        ) : trxs.length > 0 ? (
          <FlatList
            data={trxs}
            renderItem={({ item, index }) => (
              <TransactionCard transaction={item} i={index} />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => i}
          />
        ) : (
          <View
            style={{
              minHeight: 220,
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "semi-bold", fontSize: 20 }}>
              No data available
            </Text>
          </View>
        )}
      </View>
      {isAction && <Action />}
    </View>
  );
};

export default Transactions;
