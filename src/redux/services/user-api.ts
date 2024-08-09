import { SignInSchemaType } from "@/features/sign-in/schemas"
import { LoginResponse } from "@/types/user"

import { appApi } from "./app-api"

export const authApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, SignInSchemaType>({
      query: (body) => ({
        url: `/api/login`,
        method: "POST",
        body
      })
    })
  })
})

export const { useLoginMutation } = authApi
