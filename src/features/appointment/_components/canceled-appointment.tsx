import React from "react"
import { ScrollView } from "react-native"

import { Appointment } from "@/shared/components"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"
import { commonHelpers } from "@/utils/helpers/common"
const width = commonHelpers.getDimensionsParams().width

interface Props {
  data: AppointmentPrivateResponse[] | undefined
}

export const CanceledAppointment = ({ data }: Props) => {
  return (
    <ScrollView
      style={[{ width }]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingBottom: 100, paddingTop: 24 }}
    >
      {data?.map((appointment) => (
        <Appointment
          key={appointment.id}
          appointmentData={appointment}
          isHeaderButtonNeed={false}
          headerTitle={{ title: "Cancelled" }}
        />
      ))}
    </ScrollView>
  )
}
