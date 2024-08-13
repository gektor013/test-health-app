import dayjs from "dayjs"

export const dateHelper = {
  formatedData: (date: Date | string, format: string) => {
    return dayjs(date).format(format)
  }
}
