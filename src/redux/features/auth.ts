import { LoginResponse, User } from "@/types/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  user: LoginResponse | User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<LoginResponse | User>) => {
      state.isAuthenticated = true
      state.user = payload
    },
    logOut: () => {
      return initialState
    }
  }
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
