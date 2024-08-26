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

export const Appointment = () => {
  const { slideIndex, animatedStyle, stepsMethods } = useSlideStep(width)
  const {
    data: appointmentPendingData,
    refetch: refetchPendingData,
    isFetching: isPendingLoading
  } = useGetPrivateVisitsQuery({
    status: "Pending",
    page: 1
  })
  const { data: appointmentCompletedData, refetch: refetchCompletedData } =
    useGetPrivateVisitsQuery({
      status: "Completed",
      page: 1
    })
  const { data: appointmentCanceledData, refetch: refetchCanceledData } =
    useGetPrivateVisitsQuery({
      status: "Canceled",
      page: 1
    })

  useFocusEffect(
    useCallback(() => {
      refetchPendingData()
      refetchCompletedData()
      refetchCanceledData()
    }, [])
  )

  return (
    <View style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={slideIndex}
        onOptionPress={stepsMethods.handleSetSlideIndex}
      />
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <UpcommingAppointment
          data={appointmentPendingData}
          isLoading={isPendingLoading}
        />
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
