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
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

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

  const { url, isAction } = useMainContext();

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
  ];

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
          <TouchableOpacity>
            <AntDesign size={30} name="logout" color={COLORS.blue100} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "semi-bold", color: COLORS.light20 }}>
            Account Balance
          </Text>
          <Text style={{ fontFamily: "semi-bold", fontSize: 40 }}>
            ₦9,400,000
          </Text>
        </View>
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
            <Text style={styles.moneyText}>₦1,000,000</Text>
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
            <Text style={styles.moneyText}>₦1,000,000</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{ marginTop: 15 }}>
        <Text
          style={{ marginHorizontal: 20, fontFamily: "bold", fontSize: 20 }}
        >
          Spend Frequency
        </Text>
        <LineChart
          data={{
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={SIZES.width}
          height={250}
          withInnerLines={false}
          withOuterLines={false}
          withDots={false}
          chartConfig={{
            backgroundGradientFrom: COLORS.light100,
            backgroundGradientTo: COLORS.light100,
            decimalPlaces: 2,
            color: () => `rgba(0, 119, 255, 0.6)`,
            strokeWidth: "6",
          }}
          bezier
          style={{
            marginVertical: 8,
            padding: 0,
            paddingBottom: -35,
            backgroundColor: COLORS.light100,
          }}
          formatYLabel={() => ""}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginBottom: 120,
          marginTop: -10,
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
          <FlatList
            data={transactions}
            renderItem={({ item }) => <TransactionCard transaction={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => i}
          />
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
