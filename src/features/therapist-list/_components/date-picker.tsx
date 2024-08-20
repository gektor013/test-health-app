import { colors } from "@/constants"
import { SVGIcon, VectorExpoIcons } from "@/shared/components"
import dayjs from "dayjs"
import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

export const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  const changeDay = (offset: number) => {
    const newDate = currentDate.add(offset, "day")
    if (newDate.isBefore(dayjs(), "day")) {
      return
    }
    setCurrentDate(newDate)
  }
  const isPrevDisabled = currentDate.isSame(dayjs(), "day")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => changeDay(-1)} disabled={isPrevDisabled}>
          <VectorExpoIcons
            type="Octicons"
            name="chevron-left"
            size={20}
            color={isPrevDisabled ? colors.gray : colors.black}
          />
        </Pressable>
        <View style={styles.dateContainer}>
          <SVGIcon name="calendar" color={colors.green} size={14} />
          <Text style={styles.date}>{currentDate.format("MMM DD, YYYY")}</Text>
        </View>
        <Pressable onPress={() => changeDay(1)}>
          <VectorExpoIcons
            type="Octicons"
            name="chevron-right"
            size={20}
            color={colors.black}
          />
        </Pressable>
      </View>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 14
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dateContainer: {
    flexDirection: "row",
    gap: 8
  },
  date: {
    fontWeight: "600"
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: colors.light_gray
  }
})
