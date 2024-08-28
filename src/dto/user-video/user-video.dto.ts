import { z } from "zod"

export const userVideoSchemaDto = z.object({
  id: z.number(),
  title: z.string().nullable(),
  url: z.string().url(),
  category: z.string().nullable(),
  isIsActive: z.boolean(),
  hash: z.string().optional(),
  firstDescription: z.string().nullable(),
  secondDescription: z.string().nullable(),
  tags: z.array(
    z.object({
      tag: z.object({
        name: z.string()
      })
    })
  )
})
