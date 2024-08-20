import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { Therapist } from "@/shared/components"

export const AppointmentTerapist = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment therapist</Text>
      <Therapist
        rating="4.5"
        name="Dr. John Doe"
        teraphyType="Massage, Room 53"
        img={"/media/66b9d85b61ed9_profile-11.jpg"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.light_gray
  },
  title: {
    fontWeight: "600"
  }
})
