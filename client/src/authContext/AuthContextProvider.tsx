import React, { createContext, useReducer } from "react";
import { ActionType } from "./authActionType";
import authReducer from "./authReducer";

export interface IAuthState {
  id: string;
  email: string;
  accessToken: string;
}

type DispatchAuthType = ({ type, payload }: ActionType) => void;

const intialState: IAuthState = {
  id: "",
  email: "",
  accessToken: "",
};

export const AuthContext = createContext<{
  authState: IAuthState;
  dispatchAuth: DispatchAuthType;
}>({
  authState: intialState,
  dispatchAuth: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, intialState);

  return (
    <AuthContext.Provider value={{ authState, dispatchAuth }}>{children}</AuthContext.Provider>
  );
};
