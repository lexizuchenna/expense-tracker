import { View, StatusBar, FlatList } from "react-native";

import Header from "../../components/headers/Header";
import TransactionCard from "../../components/cards/TransactionCard";
import Action from "../../components/Action";

import { useMainContext } from "../../context/MainContext";
import { COLORS } from "../../constants/theme";
import gStyles from "../../styles/styles";

const Transactions = () => {
  const { isAction, trxs } = useMainContext();

  return (
    <View style={gStyles.container()}>
      <StatusBar
        backgroundColor={isAction ? "rgba(0, 119, 255, 0.2)" : COLORS.light100}
        barStyle="dark-content"
      />
      <Header text="All Transactions" />
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
    </View>
  );
};

export default Transactions;
