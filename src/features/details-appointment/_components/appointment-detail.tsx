import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"

export const AppointmentDetail = () => {
  return (
    <View style={styles.container}>
      <Text>Appointment details</Text>

      <View style={styles.row}>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <SVGIcon name="user" />
            <Text>Ronnie C. Torres</Text>
          </View>
          <View style={styles.infoRow}>
            <SVGIcon name="calendar" color={colors.green} />
            <Text>02.09.2024</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <SVGIcon name="location" />
            <Text>Room 123</Text>
          </View>
          <View style={styles.infoRow}>
            <SVGIcon name="clock" />
            <Text>9:00 AM</Text>
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
