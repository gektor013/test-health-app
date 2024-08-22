import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { memo } from "react"
import { Control, Controller } from "react-hook-form"

import { colors } from "@/constants"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { dateHelper } from "@/utils/helpers/date"

const width = Dimensions.get("window").width

interface Props {
  control: Control<AppointmentCreateSchemaData>
}

export const ChooseDate = memo(({ control }: Props) => {
  console.log("render Date")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the date and time that suits you</Text>
      <View style={styles.calendarContainer}>
        <Controller
          control={control}
          name="startedAt"
          render={({ field: { onChange, value } }) => (
            <Calendar
              current={value}
              minDate={dateHelper.plusOneDayToCurrentDay()}
              disableMonthChange={true}
              disableAllTouchEventsForDisabledDays={true}
              dayComponent={({ date, ...dayInfo }: any) => {
                const isSelected = date.dateString === value

                return (
                  <TouchableOpacity
                    onPress={() => onChange(date.dateString)}
                    style={{ flex: 1 }}
                    disabled={dayInfo.state === "disabled"}
                  >
                    <View
                      style={[
                        styles.dayContainer,
                        isSelected && styles.selectedDayContainer
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          {
                            color:
                              dayInfo.state === "disabled"
                                ? colors.dark_gray
                                : colors.black
                          },
                          isSelected && styles.selectedDayText
                        ]}
                      >
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
                textDayHeaderFontSize: 16,
                textDayHeaderFontFamily: "Poppins-SemiBold",
                textSectionTitleDisabledColor: "#fff"
              }}
            />
          )}
        />
      </View>
    </View>
  )
})

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
