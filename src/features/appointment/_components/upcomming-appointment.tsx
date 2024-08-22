import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { Appointment, Button } from "@/shared/components"
import { commonHelpers } from "@/utils/helpers/common"

const width = commonHelpers.getDimensionsParams().width

export const UpcommingAppointment = () => {
  return (
    <ScrollView
      style={[{ width }]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Scheduled upcoming visit</Text>
        <Appointment isHeaderButtonNeed={false} headerTitle={{ title: "Confirmed" }}>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          </View>
        </Appointment>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Nearest visit</Text>
        <Appointment
          isHeaderButtonNeed={false}
          headerTitle={{ title: "In Waiting", style: { color: colors.yellow } }}
        >
          <View style={styles.buttonContainer}>
            <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          </View>
        </Appointment>
        <Appointment
          isHeaderButtonNeed={false}
          headerTitle={{ title: "In Waiting", style: { color: colors.yellow } }}
        >
          <View style={styles.buttonContainer}>
            <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          </View>
        </Appointment>
        <Appointment
          isHeaderButtonNeed={false}
          headerTitle={{ title: "In Waiting", style: { color: colors.yellow } }}
        >
          <View style={styles.buttonContainer}>
            <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          </View>
        </Appointment>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 24,
    paddingBottom: 100,
    paddingTop: 24
  },
  container: {
    gap: 16
  },
  title: {
    fontWeight: "600"
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between"
  },
  button: {
    flex: 1
  }
})
