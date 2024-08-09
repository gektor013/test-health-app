import { employeeSchemaDto } from "@/dto/employees/employess.dto"
import { z } from "zod"

export type EmployeesResponse = z.infer<typeof employeeSchemaDto>
