import { IAuthState } from "./AuthContextProvider";
import { ActionType } from "./authActionType";

const authReducer = (state: IAuthState, action: ActionType): IAuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        profile_picture: action.payload.profile_picture,
        access_token: action.payload.access_token,
      };
    case "LOGOUT":
      return { ...state, id: "", email: "", profile_picture: "", access_token: "" };
    case "REFRESH_SESSION":
      return { ...state, access_token: action.payload.access_token };
    default:
      throw new Error("Invalid action type");
  }
};

export default authReducer;
