import { ActivityIndicator, View } from "react-native";

import { COLORS } from "../constants/theme";

const EmptyList = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={COLORS.bgPrimary} />
    </View>
  );
};

export default EmptyList;
