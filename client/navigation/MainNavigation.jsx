import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Home from "../screens/main-navigation/Home";
import Transactions from "../screens/main-navigation/Transactions";

import { useMainContext } from "../context/MainContext";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const Action = () => {
  return <View />;
};

export default function App() {
  const { isAction, setIsAction } = useMainContext();

  const handleTabPress = ({ route, navigation }) => {
    if (route.name === "action") {
      return setIsAction((prev) => !prev);
    }

    navigation.navigate(route.name);
  };

  const tabBar = ({ state, descriptors, navigation }) => (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const focused = state.index === index;
        const Icon = options.tabBarIcon(focused);

        return label === "action" ? (
          <View key={route.key} style={styles.action(isAction)}>
            <TouchableOpacity
              onPress={() => handleTabPress({ route, navigation, focused })}
              style={styles.actionBtn}
            >
              {Icon}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            key={route.key}
            onPress={() => handleTabPress({ route, navigation, focused })}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            {Icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
  const tabs = [
    {
      name: "home",
      component: Home,
      focused: "home-variant",
      idle: "home-variant-outline",
    },
    {
      name: "action",
      component: Action,
      focused: "close",
      idle: "plus",
    },
    {
      name: "transactions",
      component: Transactions,
      focused: "swap-horizontal-circle",
      idle: "swap-horizontal-circle-outline",
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBar={tabBar}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: (focused) => (
              <MaterialCommunityIcons
                name={
                  tab.name === "action"
                    ? isAction
                      ? tab.focused
                      : tab.idle
                    : focused
                    ? tab.focused
                    : tab.idle
                }
                color={
                  tab.name === "action"
                    ? COLORS.light100
                    : focused
                    ? COLORS.blue100
                    : COLORS.light20
                }
                size={tab.name === "action" ? 45 : 35}
              />
            ),
            headerShown: false,
          }}
          key={index}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.light60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  action: (action) => ({
    backgroundColor: action ? "rgba(0, 119, 255, 0.72)" : COLORS.light100,
    height: 50,
    width: 100,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  }),
  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    backgroundColor: COLORS.blue100,
    borderRadius: 100,
    marginTop: -45,
  },
});
