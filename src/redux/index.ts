import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist"

import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { unauthenticatedMiddleware } from "./middlewares/unauthenticated"
import { authSlice } from "./features"
import { appApi } from "./services"
import { MMKVStorage } from "./storage"

const persistConfig = {
  key: "bodybalance",
  storage: MMKVStorage,
  whitelist: [authSlice.name]
}

const reducers = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  [authSlice.name]: authSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(unauthenticatedMiddleware, appApi.middleware)
})

setupListeners(store.dispatch)

export default store
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
