import { z } from "zod"

export const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3, { message: "Name is too short" }),
    password: z.string().min(6),
    phone: z
      .string({ message: "Phone is required" })
      .min(3, { message: "Phone is too short" }),
    confirmPassword: z
      .string()
      .min(6)
      .refine((data) => data === data, { message: "Passwords do not match" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
