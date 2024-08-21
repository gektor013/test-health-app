import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Link } from "expo-router"

import { colors } from "@/constants"
import { ThrerapistDetail } from "@/shared/components"

export const AvailableToday = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available today</Text>
        <View>
          <Link
            href={"/therapist-list"}
            style={{
              color: colors.green
            }}
          >
            See All
          </Link>
          <View style={styles.line} />
        </View>
      </View>
      <ThrerapistDetail />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontWeight: "600"
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.green
  },
  bottomContainer: {
    gap: 8
  },
  time: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  }
})
