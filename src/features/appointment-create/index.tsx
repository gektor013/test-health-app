import { Animated, ScrollView, View } from "react-native"

import { Button } from "@/shared/components"
// import { slides } from "../onboarding/util"
import { commonHelpers } from "@/utils/helpers/common"

import {
  useGetAllEmployeesQuery,
  useGetEmployeeSchduleQuery
} from "@/redux/services/employee-api"
import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { useCreateVisitMutation } from "@/redux/services/visit-api"
import { appointmentSchemaFunction } from "@/schemas/appointment-create/appointment-create.schema"
import { AppointmentCreateModals } from "@/shared/components/modals/appointment.modals"
import { useTranslations } from "@/shared/hooks"
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
    id: null,
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
    sex: ""
  },
  choosenTime: {
    endTime: "",
    startTime: ""
  },
  startedAt: new Date().toISOString().split("T")[0],
  finishedAt: "",

  isPaid: false
}
// TROUBLESHOOTING
// 1. HOW TO SHOW VISIT IMG?
// 2. /api/private/employees lacks employee's photo card and dont fave rating

export const AppointmentCreate = () => {
  const { currentIndex, stepsMethods, refs } = useSetStep(width)
  const [createVisit] = useCreateVisitMutation()
  const { t } = useTranslations()

  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<AppointmentCreateSchemaData>({
    mode: "onChange",
    defaultValues: DEFAUL_DATA,
    resolver: zodResolver(appointmentSchemaFunction(currentIndex))
  })
  const WATCH_STARTED_AT = watch("startedAt")
  console.log(errors, "ERRORS")

  const { data: servicesData } = useGetAllServicesQuery()
  const { data: employeeData } = useGetAllEmployeesQuery()
  const { data: scheduleData, isFetching: isScheduleLoading } =
    useGetEmployeeSchduleQuery(
      {
        date: WATCH_STARTED_AT,
        employee_id: getValues("employee").id!,
        service_duration: getValues("service.duration")
      },
      {
        skip: !getValues("employee").id || !WATCH_STARTED_AT || !getValues("service.id"),
        refetchOnMountOrArgChange: true
      }
    )

  const slides = [
    {
      id: 1,
      component: () => (
        <>
          <VisitsTypes data={servicesData?.data} control={control} />
          <TherapistList data={employeeData?.data} control={control} />
        </>
      )
    },
    {
      id: 2,
      component: () => (
        <View style={{ flex: 1, gap: 32, marginBottom: 100 }}>
          <ChooseDate control={control} />
          <ChooseTime
            control={control}
            data={{ scheduleData: scheduleData, isLoading: isScheduleLoading }}
          />
        </View>
      )
    },
    {
      id: 3,
      component: () => <Patientdetails control={control} />
    }
  ]

  const onHandleSubmit = handleSubmit(async (data: AppointmentCreateSchemaData) => {
    switch (currentIndex) {
      case 0:
        if (errors.service || errors.employee) {
          break
        }

        return stepsMethods.handleNext()
      case 1:
        if (errors.choosenTime) {
          break
        }
        console.log(data, "DAtA STEP 2")

        return stepsMethods.handleNext()

      case 2:
        const editData = {
          ...data,
          startedAt: `${data.startedAt}T${data.choosenTime.startTime}`,
          finishedAt: `${data.startedAt}T${data.choosenTime.endTime}`
        }

        return await createVisit(editData)
          .unwrap()
          .then((res) => console.log(res, "CREATE VISIT"))
          .catch((err) => console.log(err, "ERRRORR CREATE"))
    }
  })

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

          if (index !== 1 || event.nativeEvent.contentOffset.x === 0) {
            stepsMethods.setCurrentIndex(index)
          }
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
        onPress={onHandleSubmit}
        containerStyles={{
          position: "absolute",
          bottom: 8,
          width: "100%"
        }}
        variant="primary"
      />
      <AppointmentCreateModals
        isVisible={false}
        onClose={() => {}}
        onViewAppointment={() => {}}
      />
    </View>
  )
}
