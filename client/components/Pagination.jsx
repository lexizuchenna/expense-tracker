import { StyleSheet, View } from "react-native";

import { COLORS } from "../constants/theme";

const Pagination = ({ items, currentIndex }) => {
  return (
    <View style={styles.paginationDots}>
      {items.map((_, index) => (
        <View key={index} style={[styles.dot(index, currentIndex)]} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: (index, currentIndex) => ({
    width: index === currentIndex ? 18 : 8,
    height: index === currentIndex ? 18 : 8,
    borderRadius: 100,
    backgroundColor: COLORS.blue100,
    marginHorizontal: 5,
    opacity: index === currentIndex ? 1 : 0.3,
  }),
});
