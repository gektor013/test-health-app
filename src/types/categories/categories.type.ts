import { z } from "zod"

import { categorySchemaDto } from "@/dto/categories/categories.dto"

export type CategoriesResponse = z.infer<typeof categorySchemaDto>
