import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"
import { dateHelper } from "@/utils/helpers/date"

interface Props {
  data: {
    employeeName?: string
    startVisit?: string | Date
    room?: string
  }
}

export const AppointmentDetail = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Appointment details</Text>

      <View style={styles.row}>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <SVGIcon name="user" />
            <Text>{data?.employeeName}</Text>
          </View>
          <View style={styles.infoRow}>
            <SVGIcon name="calendar" color={colors.green} />
            <Text>
              {data?.startVisit &&
                dateHelper.formatedData(data?.startVisit, "DD.MM.YYYY")}
            </Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <SVGIcon name="location" />
            <Text>Room {data.room}</Text>
          </View>
          <View style={styles.infoRow}>
            <SVGIcon name="clock" />
            <Text>
              {data?.startVisit && dateHelper.formatedData(data?.startVisit, "HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    padding: 16,
    gap: 16,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    gap: 16
  },
  info: {
    gap: 16
  },
  infoRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  }
})
