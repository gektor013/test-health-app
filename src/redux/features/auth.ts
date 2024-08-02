import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginResponse } from "@/types/user";

interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<LoginResponse>) => {
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
