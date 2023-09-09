import { IAuthState } from "./AuthContextProvider";

export type ActionType =
  | { type: "LOGIN"; payload: IAuthState }
  | { type: "LOGOUT"; payload?: undefined }
  | { type: "REFRESH_SESSION"; payload: { access_token: string } };
