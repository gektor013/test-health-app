import { z } from "zod"

import { employeeSchemaDto, freeEmployeeSchemaDto } from "@/dto/employees/employess.dto"

export type EmployeesResponse = z.infer<typeof employeeSchemaDto>

export type FreeEmployeeResponse = z.infer<typeof freeEmployeeSchemaDto>

export type ScheduleEmloyeeTime = {
  endTime: string
  startTime: string
}
