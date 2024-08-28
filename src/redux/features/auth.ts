import { LoginResponse, User } from "@/types/user"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authApi } from "../services/user-api"

interface AuthState {
  isAuthenticated: boolean
  user: LoginResponse | null
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
    logIn: (state, { payload }: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true
      state.token = payload.token
    },
    logOut: () => {
      return initialState
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
    },
    updateUserData: (state, { payload }: PayloadAction<User>) => {
      state.user = { ...payload, token: state.token! }
    }
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, payload) => {
      state.user = payload.payload
      state.isAuthenticated = true
    })
  }
})

export const { logIn, logOut, setToken, updateUserData } = authSlice.actions

export default authSlice.reducer
