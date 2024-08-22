import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { Therapist } from "@/shared/components"

export const TherapistDetails = () => {
  return (
    <View style={styles.container}>
      <Therapist
        rating="4.5"
        name="Dr. John Doe"
        teraphyType="Massage, Room 53"
        img={"/media/66b9d85b61ed9_profile-11.jpg"}
        isDetails
      />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>About</Text>

        <View style={styles.infoItems}>
          <Text style={styles.infoItem}>• mag.cin – kineziterapija</Text>
          <Text style={styles.infoItem}>• DNS Exercise trener</Text>
          <Text style={styles.infoItem}>• Wellness terapeut</Text>
        </View>
        <Text style={styles.text}>Ro en je 29.04.1994. u Dubrovniku. Ve i dio svog</Text>

        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>More</Text>
          <View style={styles.pressableLine} />
        </Pressable>
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
