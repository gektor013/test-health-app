import { Alert, StyleSheet, Text, View } from "react-native"
import Animated from "react-native-reanimated"
import { useCallback, useRef } from "react"
import { router, useFocusEffect } from "expo-router"

import { colors } from "@/constants"
import {
  useCancelVisitMutation,
  useGetPrivateVisitsQuery,
  usePrefetch
} from "@/redux/services/visit-api"
import { Button, SegmentedControl } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useSlideStep } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"

import { CanceledAppointment } from "./_components/canceled-appointment"
import { CompletedAppointment } from "./_components/completed-appointment"
import { UpcommingAppointment } from "./_components/upcomming-appointment"

const options = ["Upcoming", "Completed", "Cancelled"]
const width = commonHelpers.getDimensionsParams().width

export const Appointment = () => {
  const ref = useRef<BottomSheet | null>(null)
  const refId = useRef<number | null>(null)
  const prefetchVisit = usePrefetch("getVisitById")
  const { slideIndex, animatedStyle, stepsMethods } = useSlideStep(width)

  const {
    data: appointmentPendingData,
    refetch: refetchPendingData,
    isFetching: isPendingLoading
  } = useGetPrivateVisitsQuery({
    status: "Pending",
    page: 1
  })

  const [cancelVisit] = useCancelVisitMutation()
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

  const handleGoToDetails = (id: number) => {
    prefetchVisit(id.toString())
    router.push(`/details-appointment/${id}`)
  }

  const handleOpenBottom = (id: number) => {
    refId.current = id
    ref.current?.snapToPosition("30%")
  }

  const handleCancelAppointment = async () => {
    if (!refId.current) return
    await cancelVisit({ id: refId.current, status: "Canceled" })
      .unwrap()
      .then(() => ref.current?.close())
      .catch(() => Alert.alert("Something went wrong"))
  }

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
          isLoading={isPendingLoading}
          data={appointmentPendingData}
          onPressAppointment={handleGoToDetails}
          onCancelAppointment={handleOpenBottom}
        />
        <CompletedAppointment
          data={appointmentCompletedData}
          onPressAppointment={handleGoToDetails}
        />
        <CanceledAppointment
          data={appointmentCanceledData}
          onPressAppointment={handleGoToDetails}
        />
      </Animated.View>

      <CustomBottomSheet ref={ref}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Cancellation</Text>
            <View style={styles.bottomSheetDivider} />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text>Are you sure you want to cancel appointment?</Text>
          </View>

          <View style={styles.bottomSheetButtonsContainer}>
            <Button
              variant="outline"
              title="Cancel appointment"
              onPress={() => handleCancelAppointment()}
              containerStyles={styles.bottomSheetCancelBtnContainer}
              titleStyle={styles.bottomSheetCancelBtnTitle}
            />
          </View>
        </View>
      </CustomBottomSheet>
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
  },
  bottomSheetContainer: {
    gap: 24
  },
  bottomSheetHeader: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  bottomSheetTitle: {
    fontSize: 17,
    lineHeight: 21
  },
  bottomSheetDivider: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    width: "100%"
  },
  bottomSheetButtonsContainer: {
    gap: 16
  },
  bottomSheetCancelBtnContainer: {
    borderColor: colors.red
  },
  bottomSheetCancelBtnTitle: {
    color: colors.red
  }
})
