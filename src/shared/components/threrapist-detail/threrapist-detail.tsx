import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"

import { Therapist } from "../therapist/therapist"

export const ThrerapistDetail = () => {
  return (
    <View style={styles.bottomContainer}>
      <Therapist
        rating="4.5"
        name="Dr. John Doe"
        teraphyType="Massage, Room 53"
        img={"/media/66b9d85b61ed9_profile-11.jpg"}
      />
      <ScrollView
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 4 }}
      >
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
        <View style={styles.time}>
          <Text>10:00</Text>
        </View>
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
