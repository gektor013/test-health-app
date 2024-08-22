import { ScrollView, View } from "react-native"
import Animated from "react-native-reanimated"

import { Button } from "@/shared/components"
import { AppointmentCreateModals } from "@/shared/components/modals/appointment.modals"
import { useSlideStep } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"

import { ChooseDate } from "./components/chose-date-time/date"
import { ChooseTime } from "./components/chose-date-time/time"
import { CustomHeader } from "./components/header/header"
import { Patientdetails } from "./components/patient-form/patient-form"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { useCreateAppointment } from "./hooks/useCreateAppointment"
import { styles } from "./styles"

const width = commonHelpers.getDimensionsParams().width

export const AppointmentCreate = () => {
  const { currentIndex, animatedStyle, stepsMethods, slideIndex } = useSlideStep(width)

  const { visitData, datas, onHandleSubmit, handleBackPress, form } =
    useCreateAppointment({
      slideIndex,
      stepsMethods,
      currentIndex
    })

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={handleBackPress} />
      <Steps currentIndexStep={slideIndex} onSetStep={stepsMethods.handleSetSlideIndex} />
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            width: width * 3
          },
          animatedStyle
        ]}
      >
        {/* FIRST STEPS */}
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={[styles.pt40, { width }]}
        >
          <VisitsTypes data={datas.servicesData?.data} control={form.control} />
          <TherapistList data={datas.employeeData?.data} control={form.control} />
        </ScrollView>

        {/* SECOND STEPS */}
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={[styles.pt40, { width }]}
        >
          <View style={{ flex: 1, gap: 32, marginBottom: 100 }}>
            <ChooseDate control={form.control} />
            <ChooseTime
              control={form.control}
              data={{
                scheduleData: datas.scheduleData,
                isLoading: datas.isScheduleLoading
              }}
            />
          </View>
        </ScrollView>

        {/* THIRD STEPS */}
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={[styles.pt40, { width }]}
        >
          <Patientdetails
            control={form.control}
            formValues={form.getValues}
            onSetStep={stepsMethods.handleSetSlideIndex}
          />
        </ScrollView>
      </Animated.View>

      <Button
        title="Next"
        onPress={onHandleSubmit}
        disabled={visitData.isCreateVisitLoading}
        containerStyles={{
          position: "absolute",
          bottom: 8,
          width: "100%"
        }}
        variant="primary"
      />

      <AppointmentCreateModals
        onClose={visitData.resetCreateVisit}
        visitData={visitData.createVisitData}
        onViewAppointment={visitData.resetCreateVisit}
        isVisible={visitData.isCreateVisitSuccess}
      />
    </View>
  )
}
