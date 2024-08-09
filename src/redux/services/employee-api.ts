import { employeeSchemaDto } from "@/dto/employees/employess.dto"
import { EmployeesResponse } from "@/types/employees/employees.tpye"
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
    })
  })
})

export const { useGetAllEmployeesQuery } = endpointsmployeeApi
