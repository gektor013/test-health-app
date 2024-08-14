import { Dimensions } from "react-native"

export const commonHelpers = {
  getDimensionsParams: () => {
    return {
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height
    }
  },

  defineAllAvailableTime: (
    employeeSchedule: { startTime: string; endTime: string }[],
    duration: number = 10
  ): Record<"startTime" | "endTime", string>[] | string[] => {
    if (!employeeSchedule || !employeeSchedule.length) {
      return ["No time available for selected date"]
    }

    const availableTimes: Record<"startTime" | "endTime", string>[] = []

    employeeSchedule.forEach((schedule) => {
      const { startTime, endTime } = schedule
      const start = new Date(`1970-01-01T${startTime}:00`)
      const end = new Date(`1970-01-01T${endTime}:00`)
      let currentTime = start

      while (currentTime < end) {
        const nextTime = new Date(currentTime.getTime() + duration * 60000)

        if (nextTime <= end) {
          const formattedCurrentTime = currentTime.toTimeString().slice(0, 5)
          const formattedNextTime = nextTime.toTimeString().slice(0, 5)

          availableTimes.push({
            startTime: formattedCurrentTime,
            endTime: formattedNextTime
          })
        }

        currentTime = nextTime
      }
    })

    return availableTimes.length > 0
      ? availableTimes
      : ["No time available for selected date"]
  }
}
