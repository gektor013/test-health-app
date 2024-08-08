import { colors } from "@/constants"
import { VectorExpoIcons } from "@/shared/components"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface Props {
  t: (key: string) => string
}

export const FinalAppointment = ({ t }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.type}>{t("Type of visit")}</Text>
        <VectorExpoIcons type="Feather" name="edit" size={15} />
      </View>
      <Text style={styles.massage}>{t("Massage (Room 12)")}</Text>

      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  type: {
    color: colors.dark_gray
  },
  massage: {
    fontSize: 16
  },
  line: {
    height: 1,
    backgroundColor: colors.light_gray
  }
})
