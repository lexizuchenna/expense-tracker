import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { COLORS } from "../constants/theme";
import gStyles from "../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DeleteAction from "../components/DeleteAction";

const Transaction = () => {
  const [isDelete, setIsDelete] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();

  const { data } = params;

  const bg = data.category === "credit" ? COLORS.green100 : COLORS.red100;

  const insets = useSafeAreaInsets();
  const topHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : insets;

  function onDelete() {}

  function onCancel() {
    setIsDelete(() => false);
  }

  return (
    <View style={gStyles.container()}>
      <StatusBar backgroundColor={bg} />
      <View
        style={{
          backgroundColor: bg,
          height: 300,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <View style={styles.headerContainer(bg, topHeight)}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={30}
              color={COLORS.light100}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Transaction Detail</Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setIsDelete(true)}
          >
            <MaterialCommunityIcons
              name="delete"
              size={30}
              color={COLORS.light100}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={`₦${data.amount}`}
            editable={false}
          />
          <Text
            style={{
              color: COLORS.light80,
              fontFamily: "medium",
              fontSize: 18,
              opacity: 0.64,
            }}
          >
            {dayjs(data.date).format("dddd DD MMMM, YYYY")}
          </Text>
        </View>
      </View>

      <View style={styles.typeContainer}>
        <View>
          <Text style={styles.type}>Type</Text>
          <Text style={styles.type2}>
            {data.category === "credit" ? "Income" : "Expense"}
          </Text>
        </View>
        <View>
          <Text style={styles.type}>Category</Text>
          <Text style={styles.type2}>{data.category}</Text>
        </View>
      </View>

      <View style={styles.view1}>
        <Text
          style={{
            color: COLORS.light20,
            fontFamily: "semi-bold",
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          Description
        </Text>
        <Text
          style={{
            fontFamily: "semi-bold",
            fontSize: 18,
          }}
        >
          {data.desc}
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={gStyles.btn()} onPress={() => {}}>
            <Text style={gStyles.btnText()}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DeleteAction
        visible={isDelete}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: (bg, height) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginTop: height,
    marginBottom: 20,
    backgroundColor: bg ? bg : COLORS.light100,
  }),
  backButton: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 10,
  },
  deleteBtn: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "semi-bold",
    color: COLORS.light100,
  },

  inputContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    color: COLORS.light100,
    fontSize: 50,
    fontFamily: "bold",
  },
  view1: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  btnContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.light100,
    borderWidth: 1,
    borderColor: COLORS.light60,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: -40,
  },

  type: {
    fontFamily: "medium",
    color: COLORS.light20,
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
  },
  type2: {
    fontFamily: "semi-bold",
    fontSize: 17,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default Transaction;
