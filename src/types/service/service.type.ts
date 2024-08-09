import { serviceSchemaDto } from "@/dto/service/service.dto"
import { z } from "zod"

export type ServiceResponse = z.infer<typeof serviceSchemaDto>
