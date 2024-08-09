import { z } from "zod"

import { serviceSchemaDto } from "@/dto/service/service.dto"

export type ServiceResponse = z.infer<typeof serviceSchemaDto>
