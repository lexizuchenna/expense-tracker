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
    baseURL: "https://192.168.0.166:3200/api",
    timeout: 60000,
    timeoutErrorMessage: "Request timed out, try again later",
  });
  url.interceptors.request.use((req) => {
    req.headers.Authorization = user?.id;
    req.signal = newAbortSignal(60000);
    return req;
  });

  const getUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await url.get("/mobile/get-user");

      if (data.status === 200) return setUser((prev) => data.user);
    } catch (error) {
      console.log("get-user: ", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Error getting user";

      return ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

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
