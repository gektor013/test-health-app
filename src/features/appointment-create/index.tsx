import { Animated, ScrollView, View } from "react-native"

import { Button } from "@/shared/components"
// import { slides } from "../onboarding/util"
import { commonHelpers } from "@/utils/helpers/common"

import { useGetAllEmployeesQuery } from "@/redux/services/employee-api"
import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { appointmentSchema } from "@/schemas/appointment-create/appointment-create.schema"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChooseDate } from "./components/chose-date-time/date"
import { ChooseTime } from "./components/chose-date-time/time"
import { CustomHeader } from "./components/header/header"
import { Patientdetails } from "./components/patient-form/patient-form"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { useSetStep } from "./hooks/useStep"
import { styles } from "./styles"

const width = commonHelpers.getDimensionsParams().width

// export type AppointmentSchemaData = z.infer<typeof appointmentSchema>

const DEFAUL_DATA: AppointmentCreateSchemaData = {
  service: {
    id: null,
    name: "",
    duration: 0,
    price: "",
    isActive: false,
    createdAt: "",
    updatedAt: ""
  },
  employee: {
    name: "",
    phone: "",
    birthdate: "",
    sex: ""
  },
  cabinet: {},
  client: {
    name: "",
    phone: "",
    birthdate: "",
    sex: "Male"
  },
  startedAt: "",
  finishedAt: "",
  isPaid: true
}
// TROUBLESHOOTING
// 1. HOW TO SHOW VISIT IMG?

export const AppointmentCreate = () => {
  const { currentIndex, stepsMethods, refs } = useSetStep(width)
  const { data: servicesData } = useGetAllServicesQuery()
  const { data: employeeData } = useGetAllEmployeesQuery()
  // console.log(employeeData, "employeeData")
  // const { token } = useAppSelector((state) => state.auth)
  // console.log(token)

  const { control, handleSubmit, watch } = useForm<AppointmentCreateSchemaData>({
    defaultValues: DEFAUL_DATA,
    mode: "onChange",
    resolver: zodResolver(appointmentSchema)
  })

  const slides = [
    {
      id: 1,
      component: () => (
        <>
          <VisitsTypes data={servicesData?.data} controll={control} />
          <TherapistList data={employeeData?.data} />
        </>
      )
    },
    {
      id: 2,
      component: () => (
        <View style={{ flex: 1, gap: 32, marginBottom: 100 }}>
          <ChooseDate />
          <ChooseTime />
        </View>
      )
    },
    {
      id: 3,
      component: () => <Patientdetails />
    }
  ]

  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={stepsMethods.onBackPress} />
      <Steps currentIndexStep={currentIndex} />
      <Animated.ScrollView
        ref={refs.scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: refs.scrollX } } }],
          {
            useNativeDriver: false
          }
        )}
        scrollEventThrottle={16}
        scrollEnabled={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width)
          stepsMethods.setCurrentIndex(index)
        }}
      >
        {slides.map((slide, index) => (
          <ScrollView
            key={index}
            showsVerticalScrollIndicator={false}
            style={[styles.pt40, { width }]}
          >
            {slide.component()}
          </ScrollView>
        ))}
      </Animated.ScrollView>

      <Button
        title="Next"
        onPress={stepsMethods.handleNext}
        containerStyles={{
          position: "absolute",
          bottom: 8,
          width: "100%"
        }}
        variant="primary"
      />
    </View>
  )
}
