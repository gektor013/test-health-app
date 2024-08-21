import { z } from "zod"

import { signUpSchema } from "@/schemas/sign-up/sign-up.schema"

export type SignUp = z.infer<typeof signUpSchema>
