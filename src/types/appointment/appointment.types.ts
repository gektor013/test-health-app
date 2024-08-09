import { appointmentSchema } from "@/schemas/appointment-create/appointment-create.schema"
import { z } from "zod"

export type AppointmentCreateSchemaData = z.infer<typeof appointmentSchema>
