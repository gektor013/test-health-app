import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"

const STATUSES: Record<AppointmentPrivateResponse["status"], string> = {
  Canceled: colors.secondary_red,
  Completed: colors.green,
  Pending: colors.secondary_red
}

export const AppointmentStatus = ({
  status
}: {
  status?: AppointmentPrivateResponse["status"]
}) => {
  return (
    <View
      style={[styles.statusContainer, { backgroundColor: status && STATUSES[status] }]}
    >
      <Text style={styles.statusText}>Status: {status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: colors.green,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  statusText: {
    color: colors.white
  }
})
