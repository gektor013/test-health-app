import { profileSchema } from "@/schemas/profile/profile.schema"
import { z } from "zod"

export type Profile = z.infer<typeof profileSchema>
