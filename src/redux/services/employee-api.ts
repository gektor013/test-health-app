import { employeeSchemaDto, freeEmployeeSchemaDto } from "@/dto/employees/employess.dto"
import {
  EmployeesResponse,
  FreeEmployeeResponse,
  ScheduleEmloyeeTime
} from "@/types/employees/employees.type"
import { HydraData, TransformedData } from "@/types/transformData"
import { commonHelpers } from "@/utils/helpers/common"
import { transformDataHelpers } from "@/utils/helpers/transformData"

import { appApi } from "./app-api"

export const endpointsmployeeApi = appApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllEmployees: builder.query<TransformedData<EmployeesResponse>, void>({
      query: () => ({
        url: `/api/private/employees`,
        headers: {
          Accept: "application/ld+json"
        }
      }),
      keepUnusedDataFor: 0,
      transformResponse: (
        baseQueryReturnValue: HydraData<EmployeesResponse>
      ): TransformedData<EmployeesResponse> => {
        if (employeeSchemaDto.array().parse(baseQueryReturnValue["hydra:member"])) {
          return transformDataHelpers.transformJsonLdToJson<EmployeesResponse>(
            baseQueryReturnValue
          )
        }

        return {} as TransformedData<EmployeesResponse>
      }
    }),
    getEmployeeSchdule: builder.query<
      ScheduleEmloyeeTime[],
      { employee_id: number; date: string; service_duration: number }
    >({
      query: ({ date, employee_id }) => ({
        url: `/api/public/employees/${employee_id}/schedule/${date}`
      }),
      keepUnusedDataFor: 0,
      transformResponse: (
        baseQueryReturnValue: ScheduleEmloyeeTime[],
        _,
        params
      ): ScheduleEmloyeeTime[] => {
        return commonHelpers.defineAllAvailableTime(
          baseQueryReturnValue,
          params.service_duration
        ) as ScheduleEmloyeeTime[]
      }
    }),

    getFreeEmployees: builder.query<
      FreeEmployeeResponse[],
      { day: string; page: number; limit?: number }
    >({
      query: (params) => ({
        url: `/api/public/employees/free-time`,
        params
      }),
      transformResponse: (
        baseQueryReturnValue: FreeEmployeeResponse[],
        _,
        params
      ): FreeEmployeeResponse[] => {
        if (freeEmployeeSchemaDto.array().parse(baseQueryReturnValue)) {
          if (params?.limit) {
            return baseQueryReturnValue.slice(0, params?.limit)
          }

          return baseQueryReturnValue
        }

        return {} as FreeEmployeeResponse[]
      }
    })
  })
})

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeSchduleQuery,
  useGetFreeEmployeesQuery
} = endpointsmployeeApi
