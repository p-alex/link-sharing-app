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
      state = action.payload;
      return state;
    },
    [`${authSliceName}_logoutAction`]: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { auth_loginAction, auth_refreshSessionAction, auth_logoutAction } = authSlice.actions;

export const authReducer = authSlice.reducer;
