import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/constants"
import { useState } from "react"
import { Calendar } from "react-native-calendars"

const width = Dimensions.get("window").width
export const ChooseDate = () => {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<string>(
    today.toISOString().split("T")[0]
  )

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the date and time that suits you</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          current={today}
          disableAllTouchEventsForDisabledDays={true}
          dayComponent={({ date }: any) => {
            const isSelected = date.dateString === selectedDate

            return (
              <TouchableOpacity onPress={() => onDayPress(date)} style={{ flex: 1 }}>
                <View
                  style={[styles.dayContainer, isSelected && styles.selectedDayContainer]}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                    {date.day}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
          theme={{
            todayTextColor: "#00adf5",
            arrowColor: "black",
            monthTextColor: "black",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16
  },
  title: {
    fontWeight: "600",
    lineHeight: 17
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    width: width - 32,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: colors.secondary_gray
  },

  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 16
  },
  selectedDayContainer: {
    backgroundColor: "#66BB6A",
    borderRadius: 4,
    width: 32,
    height: 32
  },
  dayText: {
    color: "#000"
  },
  selectedDayText: {
    color: "#ffffff"
  }
})
