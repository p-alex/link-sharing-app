import React, { createContext, useState } from "react";
// import { ActionType } from "./authActionType";

export interface IAuthState {
  id: string;
  email: string;
  accessToken: string;
}

// type DispatchAuthType = ({ type, payload }: ActionType) => void;

const intialState: IAuthState = {
  id: "",
  email: "",
  accessToken: "",
};

export const AuthContext = createContext<{
  authState: IAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}>({
  authState: intialState,
  setAuthState: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const [authState, dispatchAuth] = useReducer(authReducer, intialState);
  const [authState, setAuthState] = useState<IAuthState>(intialState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>
  );
};
