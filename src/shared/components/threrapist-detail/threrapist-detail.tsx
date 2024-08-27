import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { FreeEmployeeResponse } from "@/types/employees/employees.type"

import { Therapist } from "../therapist/therapist"

interface Props {
  data?: FreeEmployeeResponse
}

export const ThrerapistDetail = ({ data }: Props) => {
  return (
    <View style={styles.bottomContainer}>
      <Therapist
        name={data?.employeeName ?? ""}
        teraphyType={data?.employeeSpeciality ?? ""}
        img={data?.employeeImage}
      />
      <ScrollView
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 4 }}
      >
        {data?.freeIntervals?.map((time) => (
          <View key={time.startTime} style={styles.time}>
            <Text>
              {time.startTime}-{time.endTime}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
