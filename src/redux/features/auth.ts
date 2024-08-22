import { LoginResponse, User } from "@/types/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  user: LoginResponse | User | null
  token?: string
}

const initialState: AuthState = {
  token: "",
  user: null,
  isAuthenticated: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<LoginResponse>) => {
      state.isAuthenticated = true
      state.user = payload
      state.token = payload.token
    },
    logOut: () => {
      return initialState
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
    }
  }
})

export const { logIn, logOut, setToken } = authSlice.actions

export default authSlice.reducer
