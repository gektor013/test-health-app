import { z } from "zod"

export const appointmentSchema = z.object({
  service: z
    .object({
      id: z.number().nullable(),
      name: z.string(),
      duration: z.number(),
      price: z.string(),
      isActive: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string()
    })
    .nullable(),
  employee: z.object({
    name: z.string(),
    phone: z.string().nullable(),
    sex: z.string().nullable(),
    birthdate: z.string().nullable()
  }),
  cabinet: z.object({}),
  client: z.object({
    name: z.string(),
    phone: z.string().nullable(),
    birthdate: z.string().nullable(),
    sex: z.string().nullable()
  }),
  startedAt: z.string(),
  finishedAt: z.string(),
  isPaid: z.boolean()
})
