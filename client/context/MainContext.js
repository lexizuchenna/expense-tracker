import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";

const Context = createContext();

export const MainContext = ({ children }) => {
  const [isAction, setIsAction] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isTrxLoading, setIsTrxLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [triggerTrx, setTriggerTrx] = useState(false);
  const [trxs, setTrxs] = useState([]);

  function newAbortSignal(time) {
    const abortController = new AbortController();

    setTimeout(() => abortController.abort("Request timeout"), time || 1000);

    return abortController.signal;
  }

  const url = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
  url.interceptors.request.use((req) => {
    req.headers.Authorization = user?._id;
    req.headers.Accept = "application/json";
    req.signal = newAbortSignal(60000);
    return req;
  });

  async function getTransactions() {
    try {
      setIsTrxLoading(true);
      const { data } = await url.get("/transactions");

      if (data.status === 200) setTrxs(data.transactions);
    } catch (error) {
      console.error("get-transactions: ", JSON.stringify(error));
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Internal server error";
      return ToastAndroid.show(
        message === "canceled" ? "Transaction request timeout" : message,
        ToastAndroid.SHORT
      );
    } finally {
      setIsTrxLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await SecureStore.deleteItemAsync("user");

      setUser(null);
      setIsLogin(false);

      ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.error("logout: ", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Internal server error";
      return ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    if (user) {
      getTransactions();
    }
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,

        isLogin,
        setIsLogin,

        trxs,
        setTrxs,

        url,

        isAction,
        setIsAction,

        triggerTrx,
        setTriggerTrx,
        isTrxLoading,

        isLocked,
        setIsLocked,

        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMainContext = () => useContext(Context);
