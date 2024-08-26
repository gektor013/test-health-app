import { z } from "zod"

import { appointmentSchemaDto } from "@/dto/appointment/appointment.dto"
import { appointmentSchemaFunction } from "@/schemas/appointment-create/appointment-create.schema"

const appointmentSchema = appointmentSchemaFunction(0)
export type AppointmentCreateSchemaData = z.infer<typeof appointmentSchema>
export type AppointmentPrivateResponse = z.infer<typeof appointmentSchemaDto>
