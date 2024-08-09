import { employeeSchemaDto } from "@/dto/employees/employess.dto"
import { EmployeesResponse, ScheduleEmloyeeTime } from "@/types/employees/employees.type"
import { HydraData, TransformedData } from "@/types/transformData"
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
      { employee_id: number; date: string }
    >({
      query: ({ date, employee_id }) => ({
        url: `/api/public/employees/${employee_id}/schedule/${date}`
      })
    })
  })
})

export const { useGetAllEmployeesQuery, useGetEmployeeSchduleQuery } = endpointsmployeeApi
