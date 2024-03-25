import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export interface IAuth {
  id: string;
  email: string;
  accessToken: string;
  sessionId: string;
}

const initialState: IAuth = {
  id: "",
  email: "",
  accessToken: "",
  sessionId: "",
};

const authSliceName = "auth";

export const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    [`${authSliceName}_loginAction`]: (state, action: PayloadAction<IAuth>) => {
      state = action.payload;
      return state;
    },
    [`${authSliceName}_refreshSessionAction`]: (state, action: PayloadAction<IAuth>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    [`${authSliceName}_logoutAction`]: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const useAuthSlice = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth;
};

export const { auth_loginAction, auth_refreshSessionAction, auth_logoutAction } = authSlice.actions;

export const authReducer = authSlice.reducer;
