import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
  StatusBar,
  Keyboard,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import Loader from "../components/Loader";
import AuthHeader from "../components/headers/AuthHeader";

import { useMainContext } from "../context/MainContext";
import { COLORS, SIZES } from "../constants/theme";
import gStyles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";

const AddTransaction = () => {
  const inputRef = useRef();
  const navigation = useNavigation();
  const { url, trxs, setTrxs, setTriggerTrx } = useMainContext();
  const { params } = useRoute();

  const { data, mode } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Shopping", value: "shopping" },
    { label: "Subscription", value: "subscription" },
    { label: "Food", value: "food" },
    { label: "Transportation", value: "transportation" },
    { label: "Miscellaneous", value: "miscellaneous" },
  ]);
  const [formData, setFormData] = useState(
    data
      ? {
          category: data?.category,
          desc: data?.desc,
          amount: data?.amount.toString(),
          date: new Date(data?.createdAt),
          id: data?._id,
        }
      : {
          category: params.type === "income" ? "credit" : "",
          desc: "",
          amount: "",
          date: new Date(),
        }
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleAddTransaction() {
    try {
      if (Object.values(formData).includes(""))
        return ToastAndroid.show("Enter all fields", ToastAndroid.SHORT);

      setIsLoading(true);

      if (mode === "edit") {
        const { data } = await url.patch("/transaction", formData);

        const transactions = trxs;

        const i = transactions.findIndex(
          (trx) => trx._id === data.transaction._id
        );

        transactions[i] = data.transaction;

        setTrxs(transactions);

        transactions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTriggerTrx((prev) => !prev);

        ToastAndroid.show(data.message, ToastAndroid.SHORT);

        return navigation.navigate("home");
      }

      const { data } = await url.post("/transaction", formData);

      const transactions = trxs;

      transactions.push(data.transaction);

      setTrxs(transactions);

      transactions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTriggerTrx((prev) => !prev);

      ToastAndroid.show(data.message, ToastAndroid.SHORT);

      return navigation.navigate("home");
    } catch (error) {
      console.error("add-transaction: ", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Internal server error";
      return ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  }

  const bg = params.type === "income" ? COLORS.green100 : COLORS.red100;

  return (
    <View style={gStyles.container(bg)}>
      <StatusBar backgroundColor={bg} />
      <AuthHeader text="Income" color={COLORS.light100} bg={bg} />
      <View style={styles.inputContainer}>
        <Text
          style={{
            color: COLORS.light80,
            fontFamily: "semi-bold",
            fontSize: 18,
            opacity: 0.64,
          }}
        >
          How much?
        </Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          keyboardType="numeric"
          placeholder="₦0"
          placeholderTextColor={COLORS.light80}
          autoComplete="off"
          value={formData.amount}
          onChangeText={(amount) => setFormData((p) => ({ ...p, amount }))}
        />
      </View>

      <View style={styles.view1}>
        {params.type === "expense" && (
          <DropDownPicker
            open={open}
            value={formData.category}
            items={items}
            setOpen={setOpen}
            setValue={(item) =>
              setFormData((p) => ({ ...p, category: item() }))
            }
            setItems={setItems}
            style={{
              borderColor: COLORS.light40,
            }}
            dropDownContainerStyle={{
              borderColor: COLORS.light40,
              marginTop: 5,
            }}
            labelStyle={{
              fontFamily: "medium",
            }}
            onPress={() => Keyboard.dismiss()}
            placeholder="Select a category"
            placeholderStyle={{ fontFamily: "medium", color: COLORS.light20 }}
          />
        )}
        <TextInput
          placeholder="Description"
          style={gStyles.input}
          placeholderTextColor={COLORS.light20}
          value={formData.desc}
          onChangeText={(desc) => setFormData((p) => ({ ...p, desc }))}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 9,
            borderColor: COLORS.light40,
            paddingVertical: 13,
            marginVertical: 0,
            paddingHorizontal: 10,
            width: SIZES.width - 40,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => setIsDateOpen((prev) => !prev)}
        >
          <Text> {dayjs(formData.date).format("DD, MMMM, YYYY")} </Text>
          <Ionicons name="calendar" size={20} color={COLORS.light20} />
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={gStyles.btn()}
            onPress={handleAddTransaction}
          >
            <Text style={gStyles.btnText()}>
              {mode === "edit" ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isDateOpen && (
        <DateTimePicker
          value={formData.date}
          onChange={(e, date) => {
            setIsDateOpen(() => false);
            setFormData((prev) => ({ ...prev, date }));
          }}
          mode="date"
        />
      )}
      <Loader visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 60,
  },
  input: {
    color: COLORS.light100,
    fontSize: 50,
    fontFamily: "bold",
    // lineHeight: 0.001,
  },
  view1: {
    flex: 1,
    backgroundColor: COLORS.light100,
    marginTop: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 40,
    elevation: 4,
  },
  btnContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddTransaction;
