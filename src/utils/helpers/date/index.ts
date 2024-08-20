import dayjs from "dayjs"

export const dateHelper = {
  formatedData: (date: Date | string, format: string) => {
    return dayjs(date).format(format)
  },
  plusOneDayToCurrentDay: (): string => {
    return dayjs().add(1, "day").format("YYYY-MM-DD")
  },
  changeDay: (offset = 0, format = "YYYY-MM-DD") => {
    return dayjs().add(offset, "day").format(format)
  }
}
