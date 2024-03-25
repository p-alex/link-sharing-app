import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export interface IProfile {
  id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  publicEmail: string;
}

const initialState: IProfile = {
  id: "",
  profilePicture: "",
  firstName: "",
  lastName: "",
  publicEmail: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileAction: (state, action: PayloadAction<IProfile>) => {
      state = action.payload;
      return state;
    },
    removeProfilePictureAction: (state) => {
      state.profilePicture = "";
      return state;
    },
    updateProfileAction: (state, action: PayloadAction<IProfile>) => {
      state = action.payload;
      return state;
    },
  },
});

export const useProfileSlice = () => {
  const profile = useSelector((state: RootState) => state.profile);
  return profile;
};

export const { setProfileAction, removeProfilePictureAction, updateProfileAction } =
  profileSlice.actions;

export const profileReducer = profileSlice.reducer;
