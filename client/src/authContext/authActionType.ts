import { IAuthState } from "./AuthContextProvider";

export type ActionType =
  | { type: "LOGIN"; payload: IAuthState }
  | { type: "LOGOUT"; payload: null }
  | { type: "REFRESH_SESSION"; payload: IAuthState };
