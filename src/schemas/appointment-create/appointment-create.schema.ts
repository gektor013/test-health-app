import { z } from "zod"

export const appointmentSchema = z
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
    employee: z
      .object({
        id: z.number().nullable(),
        name: z.string().min(1),
        phone: z.string().nullable(),
        sex: z.string().nullable(),
        birthdate: z.string().nullable()
      })
      .required(),
    cabinet: z.object({}),
    client: z.object({
      name: z.string(),
      phone: z.string().nullable(),
      birthdate: z.string().nullable(),
      sex: z.string().nullable()
    }),
    startedAt: z.string(),
    choosenTime: z.object({
      startTime: z.string().min(1),
      endTime: z.string().min(1)
    }),
    finishedAt: z.string(),
    isPaid: z.boolean()
  })
  .superRefine((data, ctx) => {
    if (data.employee.id !== null && data.choosenTime.startTime === "") {
      ctx.addIssue({
        code: "custom",
        message: "Start time is required",
        path: ["choosenTime"]
      })
      ctx.addIssue({
        code: "custom",
        message: "End time is required",
        path: ["choosenTime"]
      })
    }
  })

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
      employee: z.object({
        id: z.number().nullable(),
        name: z.string().min(1),
        phone: z.string().nullable(),
        sex: z.string().nullable(),
        birthdate: z.string().nullable()
      }),
      cabinet: z.object({}),
      client: z.object({
        name: z.string(),
        phone: z.string().nullable(),
        birthdate: z.string().nullable(),
        sex: z.string().nullable()
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
