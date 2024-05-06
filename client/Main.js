import { useEffect, useRef } from "react";
import { useNavigationState, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BackHandler, ToastAndroid } from "react-native";

import MainNavigation from "./navigation/MainNavigation";

import Profile from "./screens/Profile";
import AddTransaction from "./screens/AddTransaction";
import Transaction from "./screens/Transaction";

import Login from "./screens/auth/Login";
import SignUp from "./screens/auth/SignUp";
import ForgotPassword from "./screens/auth/ForgotPassword";
import OnBoarding from "./screens/auth/OnBoarding";
import Verification from "./screens/auth/Verification";
import CreatePin from "./screens/auth/CreatePin";
import EmailSent from "./screens/auth/EmailSent";

import AuthHeader from "./components/headers/AuthHeader";

import { useMainContext } from "./context/MainContext";

const Main = ({ getUser, getLogin }) => {
  const Stack = createNativeStackNavigator();
  const { isLogin, setUser, setIsLogin } = useMainContext();

  const doublePressInterval = 1000;
  const lastBackPressed = useRef(0);
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const currentTime = Date.now();

        const state = navigation.getState();

        // Check if the current screen is the root screen
        const isRootScreen = state.routes.length === 1 && state.index === 0;

        if (isRootScreen) {
          // Check if the time interval between presses is less than the double press interval
          if (currentTime - lastBackPressed.current < doublePressInterval) {
            // Exit the application
            BackHandler.exitApp();
            return true;
          }

          // Show a toast indicating double press is required to exit
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);

          // Update the lastBackPressed time
          lastBackPressed.current = currentTime;

          return true;
        }

        return false;
      }
    );

    return () => backHandler.remove();
  }, [navigationState]);

  useEffect(() => {
    setUser(getUser);
    setIsLogin(getLogin);
  }, []);

  return (
    <Stack.Navigator>
      {isLogin ? (
        <>
          <Stack.Screen
            name="main-navigation"
            component={MainNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="add-transaction"
            component={AddTransaction}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="transaction"
            component={Transaction}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="on-boarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ header: () => <AuthHeader text="Login" /> }}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{ header: () => <AuthHeader text="Sign Up" /> }}
          />
          <Stack.Screen
            name="verification"
            component={Verification}
            options={{ header: () => <AuthHeader text="Verification" /> }}
          />
          <Stack.Screen
            name="create-pin"
            component={CreatePin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgot-password"
            component={ForgotPassword}
            options={{ header: () => <AuthHeader text="Forgot Password" /> }}
          />
          <Stack.Screen
            name="email-sent"
            component={EmailSent}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Main;
