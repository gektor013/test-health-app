import { appApi } from "./app-api";
import { SignInSchemaType } from "@/features/sign-in/schemas";
import { LoginResponse } from "@/types/user";

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, SignInSchemaType>({
      query: (body) => ({
        url: `/api/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
