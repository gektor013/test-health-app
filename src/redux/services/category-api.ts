import { categorySchemaDto } from "@/dto/categories/categories.dto"
import { CategoriesResponse } from "@/types/categories/categories.type"
import { HydraData, TransformedData } from "@/types/transformData"
import { transformDataHelpers } from "@/utils/helpers/transformData"

import { appApi } from "./app-api"

export const categoryApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query<TransformedData<CategoriesResponse>, void>({
      query: () => ({
        url: `/api/private/categories`,
        headers: {
          Accept: "application/ld+json"
        }
      }),
      transformResponse: (
        baseQueryReturnValue: HydraData<CategoriesResponse>
      ): TransformedData<CategoriesResponse> => {
        if (categorySchemaDto.array().parse(baseQueryReturnValue["hydra:member"])) {
          return transformDataHelpers.transformJsonLdToJson<CategoriesResponse>(
            baseQueryReturnValue
          )
        }

        return {} as TransformedData<CategoriesResponse>
      }
    })
  })
})

export const { useGetCategoriesQuery } = categoryApi
