import { ScrollView, View } from "react-native"
import Animated from "react-native-reanimated"

import { Button } from "@/shared/components"
import { AppointmentCreateModals } from "@/shared/components/modals/appointment.modals"
// import { slides } from "../onboarding/util"
import { commonHelpers } from "@/utils/helpers/common"

import { ChooseDate } from "./components/chose-date-time/date"
import { ChooseTime } from "./components/chose-date-time/time"
import { CustomHeader } from "./components/header/header"
import { Patientdetails } from "./components/patient-form/patient-form"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { useCreateAppointment } from "./hooks/useCreateAppointment"
import { useSetStep } from "./hooks/useStep"
import { styles } from "./styles"

const width = commonHelpers.getDimensionsParams().width

export const AppointmentCreate = () => {
  const { currentIndex, animatedStyle, stepsMethods, slideIndex } = useSetStep(width)

  const { visitData, datas, onHandleSubmit, form } = useCreateAppointment({
    slideIndex,
    stepsMethods,
    currentIndex
  })

  const slides = [
    {
      id: 1,
      component: () => (
        <>
          <VisitsTypes data={datas.servicesData?.data} control={form.control} />
          <TherapistList data={datas.employeeData?.data} control={form.control} />
        </>
      )
    },
    {
      id: 2,
      component: () => (
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
      )
    },
    {
      id: 3,
      component: () => (
        <Patientdetails
          control={form.control}
          formValues={form.getValues}
          onSetStep={stepsMethods.handleSetSlideIndex}
        />
      )
    }
  ]

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={stepsMethods.onBackPress} />
      <Steps currentIndexStep={slideIndex} onSetStep={stepsMethods.handleSetSlideIndex} />
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            width: width * slides.length
          },
          animatedStyle
        ]}
      >
        {slides.map((slide) => (
          <ScrollView
            key={slide.id}
            showsVerticalScrollIndicator={false}
            style={[styles.pt40, { width }]}
          >
            {slide.component()}
          </ScrollView>
        ))}
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
