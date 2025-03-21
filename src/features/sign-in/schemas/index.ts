import { zod } from "@/utils/zod"

export const signInSchema = zod.object({
  // email: zod.string().max(64, { message: "Email is too long" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
  phone: zod.string().min(3, { message: "Phone is required" })
})

export type SignInSchemaType = zod.infer<typeof signInSchema>
