import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { linksReducer } from "../features/links/linksSlice";
import { globalPopupsReducer } from "../features/globalPopupsSlice/globalPopupsSlice";
import { profileReducer } from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
    globalPopups: globalPopupsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
