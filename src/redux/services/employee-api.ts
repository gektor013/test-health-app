import { employeeSchemaDto } from "@/dto/employees/employess.dto"
import { EmployeesResponse, ScheduleEmloyeeTime } from "@/types/employees/employees.type"
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
      { employee_id: number; date: string; service_duration: number | undefined }
    >({
      query: ({ date, employee_id }) => ({
        url: `/api/public/employees/${employee_id}/schedule/${date}`
      }),
      transformResponse: (
        baseQueryReturnValue: ScheduleEmloyeeTime[],
        _,
        params
      ): ScheduleEmloyeeTime[] => {
        console.log(baseQueryReturnValue)

        return commonHelpers.defineAllAvailableTime(
          baseQueryReturnValue,
          params.service_duration
        ) as ScheduleEmloyeeTime[]
      }
    })
  })
})

export const { useGetAllEmployeesQuery, useGetEmployeeSchduleQuery } = endpointsmployeeApi
