import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"

export const Notifications = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.notification, { borderColor: colors.green }]}>
        <SVGIcon name="calendar" size={22} color={colors.green} />

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>Appointment Confirm</Text>
            <Text>1hr ago</Text>
          </View>
          <Text style={styles.notificationText}>
            Your appointment confirmed with D. Ramya on Mar 27, at 10:00{" "}
          </Text>
        </View>
      </View>

      <View style={styles.notification}>
        <SVGIcon name="calendar_minus" size={22} color={colors.green} />

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>Appointment Confirm</Text>
            <Text>1hr ago</Text>
          </View>
          <Text style={styles.notificationText}>
            Your appointment confirmed with D. Ramya on Mar 27, at 10:00{" "}
          </Text>
        </View>
      </View>

      <View style={styles.notification}>
        <SVGIcon name="calendar_check" size={22} color={colors.green} />

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>Appointment Confirm</Text>
            <Text>1hr ago</Text>
          </View>
          <Text style={styles.notificationText}>
            Your appointment confirmed with D. Ramya on Mar 27, at 10:00{" "}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  notification: {
    paddingVertical: 10,
    paddingHorizontal: 23,
    paddingLeft: 23,

    borderWidth: 1,
    borderColor: colors.light_gray,
    flexDirection: "row",
    borderRadius: 10,
    gap: 23,
    alignItems: "center"
  },
  notificationContent: {
    gap: 4,
    width: "90%"
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  notificationTitle: {
    fontWeight: "600"
  },
  notificationText: {}
})
