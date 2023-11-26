import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  id: string;
  email: string;
  accessToken: string;
}

const initialState: IAuth = {
  id: "",
  email: "",
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<IAuth>) => {
      state = action.payload;
      return state;
    },
    refreshSessionAction: (state, action: PayloadAction<IAuth>) => {
      state = action.payload;
      return state;
    },
    logoutAction: (state) => {
      state = { id: "", email: "", accessToken: "" };
      return state;
    },
  },
});

export const { loginAction, refreshSessionAction, logoutAction } = authSlice.actions;

export const authReducer = authSlice.reducer;
