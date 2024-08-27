import { commonHelpers } from "@/utils/helpers/common"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
const width = commonHelpers.getDimensionsParams().width

export const NoData = ({ type }: { type: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any {type} visits yet.</Text>
      <Text style={styles.subText}>
        You can book your new appointment now and see all your upcoming and past
        appointments here.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 97,
    alignItems: "center",
    gap: 16,
    maxWidth: width - 32
  },
  text: {
    textAlign: "center"
  },
  subText: {
    textAlign: "center",
    fontSize: 12
  }
})
