import React, { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import { ActionType } from "./authActionType";

export interface IAuthState {
  id: string;
  email: string;
  profile_picture: string;
  access_token: string;
}

type DispatchAuthType = ({ type, payload }: ActionType) => void;

const intialState: IAuthState = {
  id: "",
  email: "",
  profile_picture: "",
  access_token: "",
};

export const AuthContext = createContext<{ authState: IAuthState; dispatchAuth: DispatchAuthType }>(
  {
    authState: intialState,
    dispatchAuth: () => {},
  },
);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, intialState);

  return (
    <AuthContext.Provider value={{ authState, dispatchAuth }}>{children}</AuthContext.Provider>
  );
};
