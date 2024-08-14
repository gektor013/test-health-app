import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"

import { appApi } from "./app-api"

export const visitApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getVisits: builder.query<any, void>({
      query: () => ({
        url: `/api/protected/visits`
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

export const { useGetVisitsQuery, useCreateVisitMutation } = visitApi
