import React from "react"
import { Pressable, ScrollView } from "react-native"

import { Appointment } from "@/shared/components"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"
import { commonHelpers } from "@/utils/helpers/common"
const width = commonHelpers.getDimensionsParams().width

interface Props {
  data: AppointmentPrivateResponse[] | undefined
  onPressAppointment: (id: number) => void
}

export const CompletedAppointment = ({ data, onPressAppointment }: Props) => {
  return (
    <ScrollView
      style={[{ width }]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingBottom: 100, paddingTop: 24 }}
    >
      {data?.map((appointment) => (
        <Pressable
          key={appointment.id}
          onPress={() => onPressAppointment(appointment.id)}
        >
          <Appointment
            appointmentData={appointment}
            isHeaderButtonNeed={false}
            headerTitle={{ title: appointment.status }}
          />
        </Pressable>
      ))}
    </ScrollView>
  )
}
