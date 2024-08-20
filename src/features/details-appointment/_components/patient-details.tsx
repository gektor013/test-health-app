import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"

export const PatientDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient details</Text>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <View style={styles.infoItemRow}>
            <SVGIcon name="user" />
            <Text>Kevin Lablabce, Male, 26</Text>
          </View>
          <View style={styles.infoItemRow}>
            <SVGIcon name="phone" />
            <Text>+1 (999) 111-0000</Text>
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
