import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"

import { appApi } from "./app-api"

export const visitApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getVisits: builder.query<any, void>({
      query: () => ({
        url: `/api/protected/visits`
      })
    }),

    getPrivateVisits: builder.query<
      any,
      { status: "Canceled" | "Pending" | "Completed" }
    >({
      query: (params) => ({
        url: `/api/private/visits`,
        params
      })
    }),

    createVisit: builder.mutation<
      AppointmentCreateSchemaData,
      AppointmentCreateSchemaData
    >({
      query: (body) => ({
        url: `/api/private/visits`,
        method: "POST",
        body
      })
    })
  })
})

export const { useGetVisitsQuery, useCreateVisitMutation, useGetPrivateVisitsQuery } =
  visitApi
