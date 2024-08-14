import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"

import { dateHelper } from "../helpers/date"

export const APPOINTMENT_CREATE_DEFAUL_DATA: AppointmentCreateSchemaData = {
  service: {
    id: null,
    name: "",
    duration: 0,
    price: "",
    isActive: false,
    createdAt: "",
    updatedAt: ""
  },
  employee: {
    id: null,
    name: "",
    phone: "",
    birthdate: "",
    sex: ""
  },
  cabinet: {},
  client: {
    name: "",
    phone: "",
    birthdate: "",
    sex: ""
  },
  choosenTime: {
    endTime: "",
    startTime: ""
  },
  startedAt: dateHelper.plusOneDayToCurrentDay(),
  finishedAt: "",

  isPaid: false
}
