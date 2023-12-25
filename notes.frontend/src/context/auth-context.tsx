import { User } from "oidc-client";
import { createContext } from "react";

interface IAuthContext {
  userName: string;
  setUser?: (user: string) => void;
}

const defaultState: IAuthContext = {
  userName: "",
};

export const AuthContext = createContext<IAuthContext>(defaultState);
