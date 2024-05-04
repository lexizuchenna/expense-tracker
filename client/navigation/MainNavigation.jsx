import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useState } from "react";

import Home from "../screens/main-navigation/Home";
import Transactions from "../screens/main-navigation/Transactions";

import { useMainContext } from "../context/MainContext";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const Action = () => {
  return <View></View>;
};

export default function App() {
  const { isAction, setIsAction } = useMainContext();

  const handleTabPress = ({ route, navigation }) => {
    if (route.name === "action") {
      setIsAction((prev) => !prev);
      return;
    }

    navigation.navigate(route.name);
  };

  const tabBar = ({ state, descriptors, navigation }) => (
    <View
      style={{
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
      }}
    >
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
          <View
            key={route.key}
            style={{
              backgroundColor: COLORS.light100,
              height: 95,
              width: 95,
              marginBottom: 10,
              marginTop: -35,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => handleTabPress({ route, navigation, focused })}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 70,
                width: 70,
                backgroundColor: COLORS.blue100,
                borderRadius: 100,
              }}
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
