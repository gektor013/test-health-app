import { colors } from "@/constants"
import { VectorExpoIcons } from "@/shared/components"
import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

interface Props {
  title: string
  description: string
  subDescription?: string
  onPress?: () => void
}

export const FinalAppointment = ({
  title,
  description,
  subDescription,
  onPress
}: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.type}>{title}</Text>
        <VectorExpoIcons type="Feather" name="edit" size={15} />
      </View>
      <Text style={styles.massage}>{description}</Text>
      <Text style={[styles.massage, { display: subDescription ? "flex" : "none" }]}>
        {subDescription}
      </Text>

      <View style={styles.line} />
    </Pressable>
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
