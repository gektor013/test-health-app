import { SignInSchemaType } from "@/features/sign-in/schemas"
import { LoginResponse } from "@/types/user"

import { userVideoSchemaDto } from "@/dto/user-video/user-video.dto"
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
    })
  })
})

export const { useLoginMutation, useGetUserVideoQuery } = authApi
