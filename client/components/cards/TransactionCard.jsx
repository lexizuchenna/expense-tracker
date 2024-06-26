import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { COLORS, SIZES } from "../../constants/theme";

const TransactionCard = ({ transaction, i }) => {
  const { navigate } = useNavigation();
  const { category, createdAt, desc, amount } = transaction;

  const shoppingImage = require("../../assets/images/shopping-bag.png");
  const foodImage = require("../../assets/images/restaurant.png");
  const billImage = require("../../assets/images/recurring-bill.png");
  const moneyImage = require("../../assets/images/salary.png");
  const carImage = require("../../assets/images/car.png");
  const miscImage = require("../../assets/images/misc.png");

  function getImage(category) {
    switch (category) {
      case "shopping":
        return shoppingImage;
      case "food":
        return foodImage;
      case "subscription":
        return billImage;
      case "credit":
        return moneyImage;
      case "miscellaneous":
        return miscImage;
      case "transportation":
        return carImage;
    }
  }

  function getBg(category) {
    switch (category) {
      case "shopping":
        return COLORS.yellow20;
      case "food":
        return COLORS.red20;
      case "subscription":
        return COLORS.purple20;
      case "credit":
        return COLORS.green20;
      case "miscellaneous":
        return COLORS.light40;
      case "transportation":
        return COLORS.blue500;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.wrapper, i === 0 ? { marginTop: 20 } : ""]}
      onPress={() => navigate("transaction", { data: transaction })}
    >
      <View style={styles.imageContainer(getBg(category))}>
        <Image
          source={getImage(category)}
          style={{ height: 40, width: 40 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textChild}>
          <Text style={styles.text1()}>{category}</Text>
          <Text style={styles.text1(category)}>
            {category !== "credit" ? "- " : ""}₦{amount}
          </Text>
        </View>
        <View style={styles.textChild}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontFamily: "medium",
              color: COLORS.light20,
              width: SIZES.width / 3,
            }}
          >
            {desc}
          </Text>
          <Text style={{ fontFamily: "medium", color: COLORS.light20 }}>
            {dayjs(createdAt).format("DD MMM, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
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
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: 55,
  },
  textChild: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: (category) => ({
    color: category
      ? category === "credit"
        ? COLORS.green100
        : COLORS.red100
      : COLORS.dark25,
    fontFamily: "semi-bold",
    textTransform: "capitalize",
    fontSize: 17,
  }),
});
