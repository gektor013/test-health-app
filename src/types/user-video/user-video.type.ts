import { userVideoSchemaDto } from "@/dto/user-video/user-video.dto"
import { z } from "zod"

export type UserVideoResponse = z.infer<typeof userVideoSchemaDto>
