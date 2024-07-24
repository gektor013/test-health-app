import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth";
import { User } from "@/types/user";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
