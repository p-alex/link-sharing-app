import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

type PopupType = "error" | "info";

export interface IPopup {
  id: string;
  message: string;
  type: PopupType;
}

interface IGlobalPopupsState {
  popups: IPopup[];
}

const initialState: IGlobalPopupsState = {
  popups: [],
};

const globalPopupsSlice = createSlice({
  name: "errorBoundary",
  initialState,
  reducers: {
    addPopupAction: {
      reducer: (state, action: PayloadAction<{ error: IPopup }>) => {
        state.popups = [...state.popups, action.payload.error];
        return state;
      },
      prepare: ({ message, type }: { message: string; type: PopupType }) => {
        return {
          payload: {
            error: {
              id: uuidV4(),
              message,
              type,
            },
          },
        };
      },
    },
    removePopupAction: (state, action: PayloadAction<{ error: IPopup }>) => {
      state.popups = state.popups.filter((error) => error.id !== action.payload.error.id);
      return state;
    },
    removeLastPopupAction: (state) => {
      state.popups.pop();
      return state;
    },
  },
});

export const { addPopupAction, removePopupAction, removeLastPopupAction } =
  globalPopupsSlice.actions;

export const globalPopupsReducer = globalPopupsSlice.reducer;
