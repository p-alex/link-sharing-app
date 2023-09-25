import { IAuthState } from "./AuthContextProvider";
import { ActionType } from "./authActionType";

const authReducer = (state: IAuthState, action: ActionType): IAuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      return { ...state, id: "", email: "", accessToken: "" };
    case "REFRESH_SESSION":
      return { ...state, accessToken: action.payload.access_token };
    default:
      throw new Error("Invalid action type");
  }
};

export default authReducer;
