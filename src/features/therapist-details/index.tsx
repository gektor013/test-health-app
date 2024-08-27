import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { Therapist } from "@/shared/components"
import { FreeEmployeeResponse } from "@/types/employees/employees.type"
import { useLocalSearchParams } from "expo-router"

export const TherapistDetails = () => {
  const { data } = useLocalSearchParams<{ data: any }>()
  const {
    employeeName,
    employeeSpeciality,
    employeeExperience,
    employeePhone,
    freeIntervals,
    employeeImage
  } = JSON.parse(data) as FreeEmployeeResponse

  return (
    <View style={styles.container}>
      <Therapist
        name={employeeName}
        teraphyType={employeeSpeciality}
        img={employeeImage}
        isDetails
      />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>About</Text>

        <View style={styles.infoItems}>
          <Text style={styles.infoItem}>• {employeeExperience}</Text>
          <Text style={styles.infoItem}>• {employeePhone}</Text>
          <Text style={styles.infoItem}>• {employeeSpeciality}</Text>
          <Text style={styles.infoItem}>
            • {freeIntervals.map((i) => `${i.startTime}-${i.endTime}`)}
          </Text>
        </View>
        {/* <Text style={styles.text}>Ro en je 29.04.1994. u Dubrovniku. Ve i dio svog</Text> */}

        {/* <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>More</Text>
          <View style={styles.pressableLine} />
        </Pressable> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24
  },
  infoContainer: {
    gap: 8
  },
  title: {
    fontWeight: "600"
  },
  infoItems: {},
  infoItem: {
    color: colors.dark_gray
  },
  text: {
    color: colors.dark_gray
  },
  pressable: {},
  pressableText: {
    color: colors.green
  },
  pressableLine: {
    height: 1,
    backgroundColor: colors.green,
    width: "10%"
  }
})
