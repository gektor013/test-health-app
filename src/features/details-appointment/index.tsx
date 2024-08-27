import { StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import React, { useRef } from "react"
import { useLocalSearchParams } from "expo-router"

import { colors } from "@/constants"
import { useGetVisitByIdQuery } from "@/redux/services/visit-api"
import { Button } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { AppointmentDetailModals } from "@/shared/components/modals/detail-appointment.modals"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"

import { AppointmentDetail } from "./_components/appointment-detail"
import { AppointmentStatus } from "./_components/appointment-status"
import { AppointmentTerapist } from "./_components/appointment-terapist"
import { PatientDetails } from "./_components/patient-details"
import { UploadedDocuments } from "./_components/uploaded-documents"

export const DetailsAppointment = () => {
  const ref = useRef<BottomSheet>(null)
  const { id } = useLocalSearchParams()

  const { data: visitData } = useGetVisitByIdQuery(id as string)

  return (
    <ScrollView
      overScrollMode="never"
      contentContainerStyle={styles.container}
      automaticallyAdjustContentInsets
    >
      <React.Fragment>
        <AppointmentStatus status={visitData?.status} />
        <View style={styles.infoContainer}>
          <AppointmentTerapist
            therapistData={visitData?.employee}
            serviceData={{
              room: visitData?.cabinet.name,
              type: visitData?.service.name
            }}
          />
          <AppointmentDetail
            data={{
              employeeName: visitData?.employee.name,
              startVisit: visitData?.startedAt,
              room: visitData?.cabinet.name
            }}
          />
          <PatientDetails data={visitData?.client} />
          <UploadedDocuments />
          <View style={styles.btnContainer}>
            <Button
              onPress={() => {
                if (ref.current) ref.current.snapToPosition("30%")
              }}
              title="Cancel"
              variant="outline"
              containerStyles={[
                styles.btn,
                {
                  display:
                    visitData?.status === "Canceled" || visitData?.status === "Completed"
                      ? "none"
                      : "flex"
                }
              ]}
            />
          </View>
        </View>
      </React.Fragment>

      <AppointmentDetailModals
        isVisible={false}
        onClose={() => {}}
        onViewAppointment={() => {}}
      />

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
              onPress={() => ref.current?.close()}
              containerStyles={styles.bottomSheetCancelBtnContainer}
              titleStyle={styles.bottomSheetCancelBtnTitle}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20
  },
  infoContainer: {
    paddingHorizontal: 16,
    gap: 16
  },
  btnContainer: {
    flexDirection: "row",
    gap: 8
  },
  btn: {
    flex: 1
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
