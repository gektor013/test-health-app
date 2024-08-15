import { appApi } from "./app-api"

export const videoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoTags: builder.query<any, void>({
      query: () => ({
        url: `/api/protected/video_tags`
      })
    })
  })
})

export const { useGetVideoTagsQuery } = videoApi
