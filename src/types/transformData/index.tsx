interface HydraView {
  "@id": string
  "@type": string
  "hydra:first"?: string
  "hydra:last"?: string
  "hydra:next"?: string
  "hydra:previous"?: string
}

export interface HydraData<T> {
  "hydra:totalItems": number
  "hydra:member": T[]
  "hydra:view"?: HydraView
}

export interface TransformedData<T> {
  data: T[]
  totalItems: number
  params: Record<string, unknown>
  view: {
    first: string | null | undefined
    last: string | null | undefined
    next: string | null | undefined
    previous: string | null | undefined
    current: object | null | undefined
  } | null
}
