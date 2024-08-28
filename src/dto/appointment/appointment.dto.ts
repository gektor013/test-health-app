import { z } from "zod"

export const appointmentSchemaDto = z.object({
  cabinet: z.object({
    id: z.number().nullable(),
    name: z.string().nullable()
  }),
  client: z.object({
    birthdate: z.date().or(z.string()).nullable(),
    email: z.string().email(),
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    image: z.string().nullable(),
    sex: z.enum(["Male", "Female"]).nullable()
  }),
  createdAt: z.date().or(z.string()),
  employee: z.object({
    birthdate: z.date().or(z.string()).nullable(),
    email: z.string().email(),
    id: z.number(),
    name: z.string(),
    phone: z.string().nullable(),
    image: z.string().nullable(),
    sex: z.enum(["Male", "Female"]).nullable()
  }),
  finishedAt: z.date().or(z.string()),
  id: z.number(),
  isPaid: z.boolean(),
  payAmount: z.string(),
  paymentType: z.enum(["Cash", "Credit card", "Card"]),
  questionnaire: z.null().or(z.unknown()),
  service: z.object({
    duration: z.number(),
    id: z.number(),
    name: z.string(),
    price: z.string()
  }),
  startedAt: z.date().or(z.string()),
  status: z.enum(["Canceled", "Completed", "Pending"]),
  therapyReports: z.array(z.unknown()),
  updatedAt: z.date().or(z.string())
})
