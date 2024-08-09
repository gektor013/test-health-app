import { serviceSchemaDto } from "@/dto/service/service.dto"
import { ServiceResponse } from "@/types/service/service.type"
import { HydraData, TransformedData } from "@/types/transformData"
import { transformDataHelpers } from "@/utils/helpers/transformData"

import { appApi } from "./app-api"

export const serviceApi = appApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllServices: builder.query<TransformedData<ServiceResponse>, void>({
      query: () => ({
        url: `/api/public/services`,
        headers: {
          Accept: "application/ld+json"
        }
      }),
      keepUnusedDataFor: 0,
      transformResponse: (
        baseQueryReturnValue: HydraData<ServiceResponse>
      ): TransformedData<ServiceResponse> => {
        if (serviceSchemaDto.array().parse(baseQueryReturnValue["hydra:member"])) {
          return transformDataHelpers.transformJsonLdToJson<ServiceResponse>(
            baseQueryReturnValue
          )
        }

        return {} as TransformedData<ServiceResponse>
      }
    })
  })
})

export const { useGetAllServicesQuery } = serviceApi
