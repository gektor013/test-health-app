import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"

import { Appointment, Button } from "@/shared/components"
import { commonHelpers } from "@/utils/helpers/common"
const width = commonHelpers.getDimensionsParams().width

export const CompletedAppointment = () => {
  return (
    <ScrollView
      style={[{ width }]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16 }}
    >
      <Appointment isHeaderButtonNeed={false} headerTitle={{ title: "Completed" }}>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          <Button title="Reschedule" containerStyles={styles.button} />
        </View>
      </Appointment>
      <Appointment isHeaderButtonNeed={false} headerTitle={{ title: "Completed" }}>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          <Button title="Reschedule" containerStyles={styles.button} />
        </View>
      </Appointment>
      <Appointment isHeaderButtonNeed={false} headerTitle={{ title: "Completed" }}>
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
