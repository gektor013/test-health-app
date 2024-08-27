import { ScrollView, StyleSheet, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import React, { useState } from "react"
import dayjs from "dayjs"
import { router } from "expo-router"

import { colors } from "@/constants"
import { useGetFreeEmployeesQuery } from "@/redux/services/employee-api"
import { ThrerapistDetail } from "@/shared/components"

import { DatePicker } from "./_components/date-picker"

export const TherapistList = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  const { data: freeEmployees } = useGetFreeEmployeesQuery(
    {
      day: currentDate.format("YYYY-MM-DD"),
      page: 1,
      limit: 5
    },
    { skip: !currentDate, refetchOnMountOrArgChange: true }
  )

  const changeDay = (offset: number) => {
    const newDate = currentDate.add(offset, "day")
    if (newDate.isBefore(dayjs(), "day")) {
      return
    }
    setCurrentDate(newDate)
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <DatePicker changeDay={changeDay} currentDate={currentDate} />
      </View>
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.therapistContainer}
      >
        {freeEmployees?.map((employee) => (
          <React.Fragment key={employee.employeeId}>
            <View style={{ marginTop: 0 }} />
            <TouchableWithoutFeedback
              onPress={() =>
                router.push({
                  pathname: "/therapist-details",
                  params: { data: JSON.stringify(employee) }
                })
              }
            >
              <ThrerapistDetail data={employee} />
            </TouchableWithoutFeedback>
            <View style={styles.devider} />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  therapistContainer: {
    gap: 16
  },
  devider: {
    height: 1,
    backgroundColor: colors.light_gray
  }
})
