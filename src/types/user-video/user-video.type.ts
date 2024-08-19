import { z } from "zod"

import { userVideoSchemaDto } from "@/dto/user-video/user-video.dto"

export type UserVideoResponse = z.infer<typeof userVideoSchemaDto>
