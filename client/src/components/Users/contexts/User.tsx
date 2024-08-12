/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import apiClient from "../../../services/api-client";
import {
  LoginUser,
  LS_AUTH,
  LS_USER_KEY,
  SignupUser,
  User
} from "../constants";

interface UserContext {
  user: User | null;
  token: string | null;
  error: string;
  info: string;
  resetInfoErrors: () => void;
  login: (user: LoginUser) => void;
  logout: () => void;
  signup: (user: SignupUser) => void;
}

export const Context = createContext<UserContext>({} as UserContext);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>(LS_USER_KEY, null);
  const [token, setToken] = useLocalStorage<string | null>(LS_AUTH, null);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      apiClient
        .get("/users/me")
        .then((res) => {
          const userData = res.data;
          setUser(userData);
          console.log("getMe", res.data);
        })
        .catch((err) => {
          console.log("getMeError", err);
        });
    }
  }, [token]);

  function login(user: LoginUser) {
    apiClient
      .post("/users/login", user)
      .then((res) => {
        const token = res.headers["x-auth-token"];
        if (token) {
          setToken(token);
          window.location.reload();
        } else {
          setError("Login failed");
          console.error("Token not found in headers");
        }
      })
      .catch((error) => {
        console.log("errorLogin", error);
        setError(error.response.data);
      });
  }

  function signup(user: SignupUser) {
    apiClient
      .post("/users/signup", user)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setInfo(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      });
  }

  function logout() {
    setToken(null);
    setUser(null);
    window.location.reload();
  }

  function resetInfoErrors() {
    setError("");
    setInfo("");
  }

  return (
    <Context.Provider
      value={{
        user,
        token,
        error,
        info,
        resetInfoErrors,
        login,
        logout,
        signup
      }}
    >
      {children}
    </Context.Provider>
  );
}
