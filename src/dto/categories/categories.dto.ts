import { z } from "zod"

export const categorySchemaDto = z.object({
  createdAt: z.string(),
  id: z.number(),
  name: z.string(),
  updatedAt: z.string()
})
