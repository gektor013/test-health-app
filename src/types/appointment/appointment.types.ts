import { z } from "zod"

import { appointmentSchema } from "@/schemas/appointment-create/appointment-create.schema"

export type AppointmentCreateSchemaData = z.infer<typeof appointmentSchema>
