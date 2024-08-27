import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"

export const AppointmentStatus = ({ status }: { status?: string }) => {
  return (
    <View style={styles.statusContainer}>
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
