import { Link } from "expo-router"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { useGetFreeEmployeesQuery } from "@/redux/services/employee-api"
import { ThrerapistDetail } from "@/shared/components"

export const AvailableToday = () => {
  const { data: freeEmployees } = useGetFreeEmployeesQuery({
    day: "2024-08-29",
    page: 1,
    limit: 1
  })

  console.log(freeEmployees)

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
      <ThrerapistDetail data={freeEmployees?.[0]} />
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
