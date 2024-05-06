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
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

import Loader from "../../components/Loader";

import { useMainContext } from "../../context/MainContext";

import { COLORS, SIZES } from "../../constants/theme";
import gStyles from "../../styles/styles";
import TransactionCard from "../../components/cards/TransactionCard";
import Action from "../../components/Action";

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  const { url, isAction, user, trxs } = useMainContext();

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const data = [
    {
      name: "Income",
      spend: income,
      color: COLORS.green80,
    },
    {
      name: "Expense",
      spend: expense,
      color: COLORS.red60,
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
  }, [trxs]);

  return (
    <View style={gStyles.container()}>
      <StatusBar backgroundColor="#fff6e5" barStyle="dark-content" />
      <LinearGradient
        colors={["#fff6e5", "rgba(248, 237, 216, 0.3)"]}
        style={{
          zIndex: 30,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          paddingBottom: 20,
        }}
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

          {/* <TouchableOpacity>
            <AntDesign size={30} name="logout" color={COLORS.blue100} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              borderColor: COLORS.blue100,
              borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.userIcon}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "semi-bold", color: COLORS.light20 }}>
            Account Balance
          </Text>
          <Text style={{ fontFamily: "semi-bold", fontSize: 40 }}>
            ₦9,400,000
          </Text>
        </View> */}
        <View style={styles.moneyWrapper}>
          <View
            style={[
              styles.moneyContainer,
              {
                backgroundColor: COLORS.green100,
              },
            ]}
          >
            <Text style={{ fontFamily: "semi-bold", color: COLORS.light100 }}>
              Income
            </Text>
            <Text style={styles.moneyText}>₦{income.toLocaleString()}</Text>
          </View>
          <View
            style={[
              styles.moneyContainer,
              {
                backgroundColor: COLORS.red100,
              },
            ]}
          >
            <Text style={{ fontFamily: "semi-bold", color: COLORS.light100 }}>
              Expenses
            </Text>
            <Text style={styles.moneyText}>₦{expense.toLocaleString()}</Text>
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
          <PieChart
            data={data}
            width={SIZES.width}
            height={220}
            accessor={"spend"}
            backgroundColor={"transparent"}
            center={[SIZES.width / 4, 0]}
            chartConfig={{
              color: () => `rgba(0, 0, 0, 1)`,
            }}
            style={{ marginTop: -15 }}
            hasLegend={false}
          />
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
          {/* {console.log("tt", trxs)} */}
          {trxs.length > 0 ? (
            <FlatList
              data={trxs}
              renderItem={({ item }) => <TransactionCard transaction={item} />}
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
  moneyText: {
    fontFamily: "bold",
    color: COLORS.light100,
    fontSize: 22,
  },
  headerContainer: {},
});
