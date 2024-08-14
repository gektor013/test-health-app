import { z } from "zod"

import { appointmentSchemaFunction } from "@/schemas/appointment-create/appointment-create.schema"

const appointmentSchema = appointmentSchemaFunction(0)
export type AppointmentCreateSchemaData = z.infer<typeof appointmentSchema>
