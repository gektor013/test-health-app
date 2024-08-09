import { z } from "zod"

export const employeeSchemaDto = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  isAgreed: z.boolean(),
  // isActivated: z.boolean(),
  isActive: z.boolean(),
  phone: z.string().nullable(),
  employee: z.object({
    information: z.object({
      experience: z.string(),
      education: z.string()
    }),
    // speciality: z.enum(["Trainer", "Physiotherapist"]),
    speciality: z.string(),
    duration: z.number()
  }),
  employeeSchedules: z.array(
    z.object({
      day: z.number(),
      startTime: z.string(),
      endTime: z.string(),
      isActive: z.boolean()
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  birthdate: z.string().nullable(),
  sex: z.string().nullable()
})
