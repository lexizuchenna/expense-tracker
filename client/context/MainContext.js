import { createContext, useContext, useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";

const Context = createContext();

export const MainContext = ({ children }) => {
  const [isAction, setIsAction] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerUser, setTriggerUser] = useState(false);
  const [trxs, setTrxs] = useState([]);

  function newAbortSignal(time) {
    const abortController = new AbortController();

    setTimeout(() => abortController.abort(), time || 1000);

    return abortController.signal;
  }

  const url = axios.create({
    baseURL: "http://192.168.0.166:3200/api",
    timeout: 60000,
    timeoutErrorMessage: "Request timed out, try again later",
  });
  url.interceptors.request.use((req) => {
    req.headers.Authorization = user?._id;
    req.headers.Accept = "application/json";
    req.signal = newAbortSignal(60000);
    return req;
  });

  async function getTransactions() {
    try {
      const { data } = await url.get("/transactions");

      if (data.status === 200) setTrxs(data.transactions);
    } catch (error) {
      console.error("get-transactions: ", error);
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
        isLoading,
        triggerUser,
        setTriggerUser,

        url,

        isAction,
        setIsAction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMainContext = () => useContext(Context);
