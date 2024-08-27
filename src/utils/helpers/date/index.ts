import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import utc from "dayjs/plugin/utc"
dayjs.extend(duration)

dayjs.extend(utc)

export const dateHelper = {
  formatedData: (date: Date | string, format: string) => {
    return dayjs(date).utc().format(format)
  },
  plusOneDayToCurrentDay: (): string => {
    return dayjs().add(1, "day").format("YYYY-MM-DD")
  },
  changeDay: (offset = 0, format = "YYYY-MM-DD") => {
    return dayjs().add(offset, "day").format(format)
  },
  getLocaleDateTime: (date: Date) => {
    const timezoneOffset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - timezoneOffset)

    return localDate
  },

  calculateAge: (birthDate: string): number => {
    const birth = dayjs(birthDate).utc()
    const now = dayjs().utc()
    const age = dayjs.duration(now.diff(birth)).years()
    return age
  }
}
