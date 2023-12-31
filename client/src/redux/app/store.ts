import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { linksReducer } from "../features/links/linksSlice";
import { globalPopupsReducer } from "../features/globalPopupsSlice/globalPopupsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
    globalPopups: globalPopupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
