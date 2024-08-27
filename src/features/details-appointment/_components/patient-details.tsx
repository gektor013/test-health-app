import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"
import { dateHelper } from "@/utils/helpers/date"

interface Props {
  data?: AppointmentPrivateResponse["client"]
}

export const PatientDetails = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient details</Text>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <View style={styles.infoItemRow}>
            <SVGIcon name="user" />
            <Text>
              {data?.name}, {data?.sex},{" "}
              {dateHelper.calculateAge(data?.birthdate as string)}
            </Text>
          </View>
          <View style={styles.infoItemRow}>
            <SVGIcon name="phone" />
            <Text>{data?.phone}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    padding: 16,
    gap: 16,
    borderRadius: 10
  },
  title: {
    fontWeight: "600",
    lineHeight: 17
  },
  info: {
    gap: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  infoItem: {
    gap: 16,
    flexDirection: "column"
  },
  infoItemRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  }
})
