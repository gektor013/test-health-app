import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { Appointment, Button } from "@/shared/components"
import { commonHelpers } from "@/utils/helpers/common"
const width = commonHelpers.getDimensionsParams().width

export const CanceledAppointment = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[{ width }]}
      contentContainerStyle={{ gap: 16 }}
    >
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancel", style: { color: colors.red } }}
      >
        <View style={styles.buttonContainer}>
          <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          <Button title="Reschedule" containerStyles={styles.button} />
        </View>
      </Appointment>
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancel", style: { color: colors.red } }}
      >
        <View style={styles.buttonContainer}>
          <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          <Button title="Reschedule" containerStyles={styles.button} />
        </View>
      </Appointment>
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancel", style: { color: colors.red } }}
      >
        <View style={styles.buttonContainer}>
          <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          <Button title="Reschedule" containerStyles={styles.button} />
        </View>
      </Appointment>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between"
  },
  button: {
    flex: 1 / 2
  }
})
