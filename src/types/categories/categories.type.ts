import { categorySchemaDto } from "@/dto/categories/categories.dto"
import { z } from "zod"

export type CategoriesResponse = z.infer<typeof categorySchemaDto>
