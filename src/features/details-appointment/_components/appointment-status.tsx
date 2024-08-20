import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"

export const AppointmentStatus = () => {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.statusText}>Status: Confirmed</Text>
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
