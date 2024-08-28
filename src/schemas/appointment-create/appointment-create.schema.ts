import { z } from "zod"

export const appointmentSchemaFunction = (currentIndex: number) => {
  return z
    .object({
      service: z
        .object({
          id: z.number().min(1).nullish(),
          name: z.string().min(1),
          duration: z.number(),
          price: z.string(),
          isActive: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string()
        })
        .required(),
      status: z.string().min(1),
      employee: z.object({
        id: z.number().nullable(),
        name: z.string().min(1),
        phone: z.string().nullable(),
        sex: z.string().nullable(),
        birthdate: z.string().nullable()
      }),
      cabinet: z.object({
        id: z.number().optional(),
        name: z.string().optional()
      }),
      client: z.object({
        id: z.number().optional(),
        name: z.string().transform((val, ctx) => {
          if (currentIndex === 2 && !val) {
            ctx.addIssue({
              code: "custom",
              message: "Name is required",
              path: ctx.path
            })
          }
          return val
        }),
        phone: z
          .string()
          .nullable()
          .transform((val, ctx) => {
            if (currentIndex === 2 && !val) {
              ctx.addIssue({
                code: "custom",
                message: "Name is required",
                path: ctx.path
              })
            }
            return val
          }),
        birthdate: z.string().or(z.date()).optional(),

        sex: z.string().nullable().optional()
      }),
      startedAt: z.string(),
      choosenTime: z.object({
        startTime: z.string().refine((val) => currentIndex !== 1 || !!val, {
          message: "Start time is required"
        }),
        endTime: z.string().refine((val) => currentIndex !== 1 || !!val, {
          message: "End time is required"
        })
      }),
      finishedAt: z.string(),
      isPaid: z.boolean()
    })
    .superRefine((data, ctx) => {
      if (currentIndex === 1 && !data.choosenTime.startTime) {
        ctx.addIssue({
          code: "custom",
          message: "Start time is required",
          path: ["choosenTime.startTime"]
        })
      }
      if (currentIndex === 1 && !data.choosenTime.endTime) {
        ctx.addIssue({
          code: "custom",
          message: "End time is required",
          path: ["choosenTime.endTime"]
        })
      }
    })
}
