import { appointmentSchemaDto } from "@/dto/appointment/appointment.dto"
import {
  AppointmentCreateSchemaData,
  AppointmentPrivateResponse
} from "@/types/appointment/appointment.types"

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
      { status: "Canceled" | "Pending" | "Completed"; page: number; limit?: number }
    >({
      query: (params) => ({
        url: `/api/private/visits`,
        params: {
          status: params.status,
          page: params.page
        }
      }),
      providesTags: ["Visits"],
      transformResponse: (
        baseQueryReturnValue: AppointmentPrivateResponse[],
        _,
        params
      ): AppointmentPrivateResponse[] => {
        if (appointmentSchemaDto.array().parse(baseQueryReturnValue)) {
          if (params.limit) {
            return baseQueryReturnValue.slice(0, 3)
          }

          return baseQueryReturnValue
        }

        return {} as AppointmentPrivateResponse[]
      }
    }),

    getVisitById: builder.query<AppointmentPrivateResponse, string>({
      query: (id) => ({
        url: `/api/private/visits/${id}`
      })
    }),

    cancelVisit: builder.mutation<
      AppointmentCreateSchemaData,
      { id: number | string; status: "Canceled" }
    >({
      query: (body) => ({
        url: `/api/private/visits/${body.id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Visits"]
    }),

    createVisit: builder.mutation<
      AppointmentCreateSchemaData,
      AppointmentCreateSchemaData
    >({
      query: (body) => ({
        url: `/api/private/visits`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Visits"]
    })
  })
})

export const {
  useGetVisitsQuery,
  useCreateVisitMutation,
  useGetPrivateVisitsQuery,
  useGetVisitByIdQuery,
  useCancelVisitMutation,
  usePrefetch
} = visitApi
