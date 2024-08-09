import { HydraData, TransformedData } from "@/types/transformData"
import { GET_PAGE_NUMBER_REGEX } from "@/utils/constants/data"

const helpers = {
  getQueryParams(paramsString: string): Record<string, unknown> {
    const queryParams = new URLSearchParams(paramsString) as URLSearchParams
    const params = {} as Record<string, unknown>

    queryParams.forEach((value, key) => {
      const parsedValue = parseFloat(value)
      params[key] = Number.isNaN(parsedValue) ? value : parsedValue
    })

    return params
  },

  transformJsonLdToJson<Data>(hydraData: HydraData<Data>): TransformedData<Data> {
    if (!hydraData) return {} as TransformedData<Data>

    const paramsString = hydraData["hydra:view"]
      ? hydraData["hydra:view"]["@id"].split("?")[1]
      : ""

    const transorfmData: TransformedData<Data> = {
      data: hydraData["hydra:member"],
      totalItems: hydraData["hydra:totalItems"],
      params: helpers.getQueryParams(paramsString),
      view: hydraData["hydra:view"]
        ? {
            first: hydraData["hydra:view"]["hydra:first"]
              ? hydraData["hydra:view"]["hydra:first"].match(GET_PAGE_NUMBER_REGEX)?.[1]
              : null,
            last: hydraData["hydra:view"]["hydra:last"]
              ? hydraData["hydra:view"]["hydra:last"].match(GET_PAGE_NUMBER_REGEX)?.[1]
              : null,
            next: hydraData["hydra:view"]["hydra:next"]
              ? hydraData["hydra:view"]["hydra:next"].match(GET_PAGE_NUMBER_REGEX)?.[1]
              : null,
            previous: hydraData["hydra:view"]["hydra:previous"]
              ? hydraData["hydra:view"]["hydra:previous"].match(
                  GET_PAGE_NUMBER_REGEX
                )?.[1]
              : null,
            current: helpers.getQueryParams(paramsString)?.["page"] || null
          }
        : null
    }

    return transorfmData
  }

  // transformLocalSearchParams<T extends Array<string | number>>(
  //   params: T
  // ): Record<string, string | number> {
  //   return params.reduce((acc, cur, index, array) => {
  //     if (index % 2 === 0) {
  //       acc[cur as string] = array[index + 1] as string | number
  //     }
  //     return acc
  //   }, {} as Record<string, string | number>)
  // }
}

export { helpers as transformDataHelpers }
