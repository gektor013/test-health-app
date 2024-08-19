import DoctorImg from "#/doctors/doctor-1.png"
import { colors } from "@/constants"
import { commonHelpers } from "@/utils/helpers/common"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { SharedValue } from "react-native-reanimated"
import { SVGIcon } from "../ui-kit"

const width = commonHelpers.getDimensionsParams().width

interface Props {
  x: SharedValue<number>
}

export const Appointment = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.mainContainer}>
        <View style={styles.doctorContainer}>
          <Image source={DoctorImg} style={styles.doctorImage} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Ronnie C. Torres</Text>
            <Text>Massage, Room 53 </Text>
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <SVGIcon name="arrow_right" color={colors.white} size={14} />
        </View>
      </View>

      <View style={styles.devider} />

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <SVGIcon name="calendar" color={colors.green} size={14} />
          <Text>02.09.2024</Text>
        </View>

        <View style={styles.infoRow}>
          <SVGIcon name="clock" color={colors.green} size={14} />
          <Text>9:00 AM</Text>
        </View>

        <View style={styles.infoRow}>
          <SVGIcon name="location" color={colors.green} size={14} />
          <Text>Room 123</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 12,
    gap: 16,
    width: width - 32
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%"
  },
  doctorContainer: {
    flexDirection: "row",
    gap: 16
  },
  doctorImage: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 6
  },
  doctorInfo: {
    gap: 8
  },
  doctorName: {
    fontSize: 17,
    lineHeight: 21
  },
  doctorSpeciality: {
    fontSize: 17,
    lineHeight: 21
  },
  arrowContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
    borderRadius: 10
  },
  devider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.green
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoRow: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  infoText: {
    fontSize: 17,
    lineHeight: 21
  }
})
