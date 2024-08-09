import { z } from "zod"

import { employeeSchemaDto } from "@/dto/employees/employess.dto"

export type EmployeesResponse = z.infer<typeof employeeSchemaDto>

export type ScheduleEmloyeeTime = {
  endTime: string
  startTime: string
}
