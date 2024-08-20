import { signUpSchema } from "@/schemas/sign-up/sign-up.schema"
import { z } from "zod"

export type SignUp = z.infer<typeof signUpSchema>
