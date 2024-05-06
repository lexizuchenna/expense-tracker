import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS, SIZES } from "../constants/theme";

const DeleteAction = ({ visible, onDelete, onCancel }) => {
  if (!visible) return null;

  const btn = [
    {
      text: "No",
      bg: COLORS.blue500,
      color: COLORS.blue100,
    },
    {
      text: "Yes",
      bg: COLORS.blue100,
      color: COLORS.light100,
    },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.line}></View>
        <Text style={styles.cardText}>Delete this transaction?</Text>
        <Text style={[styles.cardText, { color: COLORS.light20 }]}>
          Are you sure you want to{" "}
          <Text style={{ color: COLORS.red100 }}>delete</Text> this transaction?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
            width: SIZES.width - 40,
          }}
        >
          {btn.map((b) => (
            <TouchableOpacity
              style={styles.btn(b.bg)}
              key={b.text}
              onPress={b.text === "Yes" ? onDelete : onCancel}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  color: b.color,
                  fontSize: 18,
                }}
              >
                {b.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DeleteAction;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  btn: (bg) => ({
    backgroundColor: bg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: SIZES.width / 2 - 30,
  }),
  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: SIZES.width,
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.light100,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: COLORS.blue300,
    marginBottom: 20,
    borderRadius: 2,
    marginTop: 5,
  },
  cardText: {
    fontFamily: "semi-bold",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
});
