import { appointmentSchemaFunction } from "@/schemas/appointment-create/appointment-create.schema"
import { z } from "zod"

const appointmentSchema = appointmentSchemaFunction(0)
export type AppointmentCreateSchemaData = z.infer<typeof appointmentSchema>
