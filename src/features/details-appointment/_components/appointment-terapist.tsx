import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { Therapist } from "@/shared/components"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"

interface Props {
  therapistData?: AppointmentPrivateResponse["employee"]
  serviceData: {
    room?: string
    type?: string
  }
}

export const AppointmentTerapist = ({ therapistData, serviceData }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment therapist</Text>
      <Therapist
        name={therapistData?.name ?? ""}
        teraphyType={`${serviceData?.type}, Room ${serviceData?.room}`}
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
