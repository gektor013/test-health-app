import { z } from "zod"

export const serviceSchemaDto = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.number(),
  price: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
})
