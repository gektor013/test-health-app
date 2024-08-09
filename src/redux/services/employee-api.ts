import { ServiceResponse } from "@/types/service/service.type"
import { TransformedData } from "@/types/transformData"
import { appApi } from "./app-api"

export const endpointsmployeeApi = appApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllEmployees: builder.query<TransformedData<ServiceResponse>, void>({
      query: () => ({
        url: `/api/private/employees`,
        headers: {
          Accept: "application/ld+json"
        }
      }),
      keepUnusedDataFor: 0
      // transformResponse: (
      //   baseQueryReturnValue: HydraData<ServiceResponse>
      // ): TransformedData<ServiceResponse> => {
      //   if (serviceSchemaDto.array().parse(baseQueryReturnValue["hydra:member"])) {
      //     return transformDataHelpers.transformJsonLdToJson<ServiceResponse>(
      //       baseQueryReturnValue
      //     )
      //   }

      //   return {} as TransformedData<ServiceResponse>
      // }
    })
  })
})

export const { useGetAllEmployeesQuery } = endpointsmployeeApi
