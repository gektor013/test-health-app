import {
  AppointmentCreateSchemaData,
  AppointmentPrivateResponse
} from "@/types/appointment/appointment.types"

import { appointmentSchemaDto } from "@/dto/appointment/appointment.dto"
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
      AppointmentPrivateResponse[],
      { status: "Canceled" | "Pending" | "Completed"; page: number }
    >({
      query: (params) => ({
        url: `/api/private/visits`,
        params
      }),
      transformResponse: (
        baseQueryReturnValue: AppointmentPrivateResponse[]
      ): AppointmentPrivateResponse[] => {
        if (appointmentSchemaDto.array().parse(baseQueryReturnValue)) {
          return baseQueryReturnValue
        }

        return {} as AppointmentPrivateResponse[]
      }
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
