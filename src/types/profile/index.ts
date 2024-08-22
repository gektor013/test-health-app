import { z } from "zod"

import { profileSchema } from "@/schemas/profile/profile.schema"

export type Profile = z.infer<typeof profileSchema>
