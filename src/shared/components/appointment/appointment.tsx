import React from "react"
import { Image, Pressable, StyleSheet, Text, TextProps, View } from "react-native"

import { colors } from "@/constants"
import { commonHelpers } from "@/utils/helpers/common"

import DoctorImg from "#/doctors/doctor-1.png"

import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"
import { dateHelper } from "@/utils/helpers/date"
import { SVGIcon } from "../ui-kit"

const width = commonHelpers.getDimensionsParams().width

interface Props {
  appointmentData: AppointmentPrivateResponse
  isHeaderButtonNeed?: boolean
  children?: React.ReactNode
  headerTitle?: {
    title: string
    style?: TextProps["style"]
  }
}

export const Appointment = ({
  children,
  headerTitle,
  appointmentData,
  isHeaderButtonNeed = true
}: Props) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.mainContainer}>
        <View style={styles.doctorContainer}>
          <Image source={DoctorImg} style={styles.doctorImage} />
          <View style={styles.doctorInfoContainer}>
            <View style={styles.doctorInfoTitleContainer}>
              <Text style={styles.doctorName}>{appointmentData?.employee.name}</Text>
              {isHeaderButtonNeed ? (
                <Pressable style={styles.arrowContainer}>
                  <SVGIcon name="arrow_right" color={colors.white} size={14} />
                </Pressable>
              ) : (
                <Text style={[{ color: colors.green }, headerTitle?.style]}>
                  {headerTitle?.title}
                </Text>
              )}
            </View>
            <Text style={{ maxWidth: "85%" }}>{appointmentData?.service.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.devider} />

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <SVGIcon name="calendar" color={colors.green} size={14} />
          <Text>{dateHelper.formatedData(appointmentData?.startedAt, "DD.MM.YYYY")}</Text>
        </View>

        <View style={styles.infoRow}>
          <SVGIcon name="clock" color={colors.green} size={14} />
          <Text>{dateHelper.formatedData(appointmentData?.startedAt, "HH:mm")}</Text>
        </View>

        <View style={styles.infoRow}>
          <SVGIcon name="location" color={colors.green} size={14} />
          <Text>Room {appointmentData?.cabinet.name}</Text>
        </View>
      </View>

      {children}
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
  doctorInfoContainer: {
    flex: 1,
    gap: 8,
    position: "relative"
  },
  doctorInfoTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
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
    borderRadius: 10,
    position: "absolute",
    right: 0
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
