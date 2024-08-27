import React from "react"
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"

import { colors } from "@/constants"
import { usePrefetch } from "@/redux/services/visit-api"
import { Appointment, Button } from "@/shared/components"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"
import { commonHelpers } from "@/utils/helpers/common"
import { router } from "expo-router"

const width = commonHelpers.getDimensionsParams().width

interface Props {
  data: AppointmentPrivateResponse[] | undefined
  isLoading?: boolean
}

export const UpcommingAppointment = ({ data, isLoading }: Props) => {
  const prefetchVisit = usePrefetch("getVisitById")

  const handleGoToDetails = (id: number) => {
    prefetchVisit(id.toString())

    router.push({
      pathname: "/details-appointment/[id]",
      params: { id }
    })
  }

  return (
    <ScrollView
      style={[{ width }]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* <View style={styles.container}>
        <Text style={styles.title}>Scheduled upcoming visit</Text>
        <Appointment isHeaderButtonNeed={false} headerTitle={{ title: "Confirmed" }}>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" variant="outline" containerStyles={styles.button} />
          </View>
        </Appointment>
      </View> */}
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nearest visit</Text>
          <ActivityIndicator
            size="small"
            color={colors.green}
            style={[
              styles.indicator,
              {
                display: isLoading ? "flex" : "none"
              }
            ]}
          />
        </View>
        {data?.map((appointment) => (
          <Pressable
            onPress={() => handleGoToDetails(appointment.id)}
            key={appointment.id}
          >
            <Appointment
              isHeaderButtonNeed={false}
              appointmentData={appointment}
              headerTitle={{ title: "In Waiting", style: { color: colors.yellow } }}
            >
              <View style={styles.buttonContainer}>
                <Button
                  title="Cancel"
                  variant="outline"
                  containerStyles={styles.button}
                />
              </View>
            </Appointment>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 24,
    paddingBottom: 100,
    paddingTop: 24
  },
  container: {
    gap: 16
  },
  titleContainer: {
    position: "relative",
    width: "30%"
  },
  title: {
    fontWeight: "600"
  },
  indicator: {
    position: "absolute",
    right: 0
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between"
  },
  button: {
    flex: 1
  }
})
