import { API_URL } from "@/constants/enviroments"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from ".."

export const appApi = createApi({
  reducerPath: "appApi",
  keepUnusedDataFor: 0,
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const state: RootState = getState() as RootState
      const token = state.auth.token

      if (headers.has("Internal-key")) {
        headers.set("Authorization", `Bearer ${headers.get("Internal-key")}`)
        headers.delete("Internal-key")
      } else if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      if (!headers.has("Ignore-Headers")) {
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json")
          headers.set("content-type", "application/json")
        }
        if (!headers.has("Accept")) {
          headers.set("Accept", "application/json")
        }
      } else {
        headers.delete("Ignore-Headers")
      }

      return headers
    }
  }),
  endpoints: () => ({})
})
