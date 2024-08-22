import { ScrollView } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { Appointment } from "@/shared/components"
import { commonHelpers } from "@/utils/helpers/common"
const width = commonHelpers.getDimensionsParams().width

export const CanceledAppointment = () => {
  return (
    <ScrollView
      style={[{ width }]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 16, paddingBottom: 100, paddingTop: 24 }}
    >
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancelled", style: { color: colors.red } }}
      ></Appointment>
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancelled", style: { color: colors.red } }}
      ></Appointment>
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancelled", style: { color: colors.red } }}
      ></Appointment>
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancelled", style: { color: colors.red } }}
      ></Appointment>
      <Appointment
        isHeaderButtonNeed={false}
        headerTitle={{ title: "Cancelled", style: { color: colors.red } }}
      ></Appointment>
    </ScrollView>
  )
}
