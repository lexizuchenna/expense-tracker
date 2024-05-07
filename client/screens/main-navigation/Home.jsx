import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import TransactionCard from "../../components/cards/TransactionCard";
import Action from "../../components/Action";

import { useMainContext } from "../../context/MainContext";
import { COLORS, SIZES } from "../../constants/theme";
import gStyles from "../../styles/styles";

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  const { isAction, user, trxs, triggerTrx } = useMainContext();

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const data = [
    {
      name: "Income",
      spend: income,
      color: COLORS.blue200,
    },
    {
      name: "Expense",
      spend: expense,
      color: COLORS.blue400,
    },
  ];

  useEffect(() => {
    const totalIn = trxs.reduce((acc, trx) => {
      const { category, amount } = trx;

      if (category === "credit") return acc + amount;
      else return acc;
    }, 0);
    const totalEx = trxs.reduce((acc, trx) => {
      const { category, amount } = trx;

      if (category !== "credit") return acc + amount;
      else return acc;
    }, 0);

    setIncome(totalIn);
    setExpense(totalEx);
  }, [triggerTrx, trxs]);

  return (
    <View style={gStyles.container()}>
      <StatusBar backgroundColor={"#fff6e5"} barStyle="dark-content" />
      <LinearGradient
        colors={["#fff6e5", "rgba(248, 237, 216, 0.3)"]}
        style={styles.gradient}
      >
        <View style={styles.header(topHeight)}>
          <View>
            <Text
              style={{
                fontFamily: "semi-bold",
                fontSize: 30,
                color: COLORS.light20,
              }}
            >
              Hello,
            </Text>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 30,
                color: COLORS.blue100,
              }}
            >
              {user?.name?.split(" ")[0]}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              borderColor: COLORS.blue100,
              borderWidth: 1,
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate("profile")}
          >
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.userIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.moneyWrapper}>
          <View
            style={[
              styles.moneyContainer,
              {
                backgroundColor: COLORS.blue100,
              },
            ]}
          >
            <Text style={{ fontFamily: "semi-bold", color: COLORS.light100 }}>
              Income
            </Text>
            <Text style={styles.moneyText()}>₦{income.toLocaleString()}</Text>
          </View>
          <View
            style={[
              styles.moneyContainer,
              {
                backgroundColor: COLORS.blue500,
              },
            ]}
          >
            <Text style={{ fontFamily: "semi-bold", color: COLORS.blue100 }}>
              Expenses
            </Text>
            <Text style={styles.moneyText(COLORS.blue100)}>
              ₦{expense.toLocaleString()}
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{ minHeight: 220 }}>
        <Text
          style={{
            marginHorizontal: 20,
            fontFamily: "bold",
            fontSize: 20,
            zIndex: 1,
          }}
        >
          Income/Expense Chart
        </Text>
        {income !== 0 || expense !== 0 ? (
          <View style={styles.chartContainer}>
            <View style={{ marginRight: 40, paddingLeft: 20 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.chartLegend(COLORS.blue100)}></View>
                  <Text style={{ fontFamily: "medium" }}>Income</Text>
                </View>
                <Text style={styles.chartText}>₦{income.toLocaleString()}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.chartLegend(COLORS.blue400)}></View>
                  <Text style={{ fontFamily: "medium" }}>Expense</Text>
                </View>
                <Text style={styles.chartText}>
                  ₦{expense.toLocaleString()}
                </Text>
              </View>
            </View>
            <PieChart
              data={data}
              width={SIZES.width}
              height={220}
              accessor={"spend"}
              backgroundColor={"transparent"}
              chartConfig={{
                color: () => `rgba(0, 0, 0, 1)`,
              }}
              style={{ marginTop: -15, flex: 1 }}
              hasLegend={false}
            />
          </View>
        ) : (
          <View
            style={{
              height: 220,
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
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginBottom: 120,
          marginTop: -5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "semi-bold", fontSize: 20 }}>
            Recent Transaction
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.blue500,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate("transactions")}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 14,
                color: COLORS.blue100,
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {trxs.length > 0 ? (
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
      </View>
      <Loader />
      {isAction && <Action />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: (height) => ({
    marginTop: height,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  }),
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  moneyIcon: {
    width: 38,
    height: 38,
  },
  moneyWrapper: {
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  moneyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    width: SIZES.width / 2 - 30,
  },
  moneyText: (color) => ({
    fontFamily: "bold",
    color: color ? color : COLORS.light100,
    fontSize: 22,
  }),
  chartText: {
    marginLeft: 15,
    fontFamily: "bold",
    fontSize: 22,
    color: COLORS.dark25,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  chartLegend: (bg) => ({
    height: 17,
    width: 5,
    backgroundColor: bg,
    borderRadius: 10,
    marginRight: 10,
  }),
  gradient: {
    zIndex: 30,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingBottom: 20,
  },
});
