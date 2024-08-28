import { userVideoSchemaDto } from "@/dto/user-video/user-video.dto"
import { SignInSchemaType } from "@/features/sign-in/schemas"
import { Profile } from "@/types/profile"
import { SignUp } from "@/types/sign-up"
import { LoginResponse, User } from "@/types/user"
import { UserVideoResponse } from "@/types/user-video/user-video.type"
import { commonHelpers } from "@/utils/helpers/common"

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
    }),
    registrations: builder.mutation<LoginResponse, SignUp & { isAgreed: boolean }>({
      query: (body) => ({
        url: `/api/public/registration`,
        method: "POST",
        body
      })
    }),

    getUserVideo: builder.query<
      UserVideoResponse[],
      {
        category?: string | null
      }
    >({
      query: (body) => ({
        url: `/api/private/users/my-videos`,
        body,
        method: "POST",
        headers: {
          Accept: "application/ld+json"
        }
      }),
      transformResponse: (
        baseQueryReturnValue: UserVideoResponse[]
      ): UserVideoResponse[] => {
        if (userVideoSchemaDto.array().parse(baseQueryReturnValue)) {
          return baseQueryReturnValue.map((video) => {
            return { ...video, hash: commonHelpers.getUrlHash(video.url) ?? undefined }
          })
        }

        return {} as UserVideoResponse[]
      }
    }),

    editUserData: builder.mutation<User, Profile & { userId: string; image?: string }>({
      query: (body) => ({
        url: `/api/private/users/${body.userId}`,
        method: "PATCH",
        body: JSON.stringify(body)
      })
    }),

    updatePassword: builder.mutation<unknown, { id: number; password: string }>({
      query: (body) => ({
        url: `/api/private/users/${body.id}/update-password`,
        method: "PATCH",
        body: {
          password: body.password
        }
      })
    })
  })
})

export const {
  useLoginMutation,
  useGetUserVideoQuery,
  useRegistrationsMutation,
  useEditUserDataMutation,
  useUpdatePasswordMutation
} = authApi
