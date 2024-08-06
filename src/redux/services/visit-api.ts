import { appApi } from "./app-api"

export const visitApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getVisits: builder.query<any, void>({
      query: () => ({
        url: `/api/protected/visits`
      })
    })
  })
})

export const { useGetVisitsQuery } = visitApi
