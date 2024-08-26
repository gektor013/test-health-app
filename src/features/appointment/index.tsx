import { StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated"

import { SegmentedControl } from "@/shared/components"
import { useSlideStep } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"

import { useGetPrivateVisitsQuery } from "@/redux/services/visit-api"
import { useFocusEffect } from "expo-router"
import { useCallback } from "react"
import { CanceledAppointment } from "./_components/canceled-appointment"
import { CompletedAppointment } from "./_components/completed-appointment"
import { UpcommingAppointment } from "./_components/upcomming-appointment"

const options = ["Upcoming", "Completed", "Cancelled"]
const width = commonHelpers.getDimensionsParams().width

const CustomUseEffect = <T extends Function>(cb: T) => {
  useFocusEffect(
    useCallback(() => {
      cb()

      return () => {
        console.log("UnMounting")

        // Do something that should run on blur
      }
    }, [])
  )
}

export const Appointment = () => {
  const { slideIndex, animatedStyle, stepsMethods } = useSlideStep(width)
  const { data: appointmentPendingData } = useGetPrivateVisitsQuery({
    status: "Pending",
    page: 1
  })
  const { data: appointmentCompletedData } = useGetPrivateVisitsQuery({
    status: "Completed",
    page: 1
  })
  const { data: appointmentCanceledData } = useGetPrivateVisitsQuery({
    status: "Canceled",
    page: 1
  })

  return (
    <View style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={slideIndex}
        onOptionPress={stepsMethods.handleSetSlideIndex}
      />
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <UpcommingAppointment data={appointmentPendingData} />
        <CompletedAppointment data={appointmentCompletedData} />
        <CanceledAppointment data={appointmentCanceledData} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
    // gap: 24
  },
  animatedContainer: {
    flex: 1,
    flexDirection: "row",
    width: width * 3
    // marginTop: 24
  }
})
