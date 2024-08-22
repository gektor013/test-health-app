import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  phone: z
    .string({ message: "Phone is required" })
    .min(12, { message: "Phone is too short" }),
  email: z.string().email(),
  birthdate: z.string().min(1, { message: "Birthdate is required" }).or(z.date()),
  sex: z
    .string()
    .min(1, { message: "Sex is required" })
    .refine((value) => value === "Male" || value === "Female" || value === "", {
      message: "Sex must be either 'Male' or 'Female'"
    })
})
