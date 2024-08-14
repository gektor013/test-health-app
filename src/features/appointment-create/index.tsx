import { Alert, ScrollView, View } from "react-native"

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
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChooseDate } from "./components/chose-date-time/date"
import { ChooseTime } from "./components/chose-date-time/time"
import { Patientdetails } from "./components/patient-form/patient-form"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
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
  startedAt: dateHelper.plusOneDayToCurrentDay(),
  finishedAt: "",

  isPaid: false
}

import { dateHelper } from "@/utils/helpers/date"
import Animated from "react-native-reanimated"
import { CustomHeader } from "./components/header/header"
import { useSetStep } from "./hooks/useStep"

export const AppointmentCreate = () => {
  const { currentIndex, animatedStyle, stepsMethods, slideIndex } = useSetStep(width)
  const [
    createVisit,
    {
      data: createVisitData,
      reset: resetCreateVisit,
      isLoading: isCreateVisitLoading,
      isSuccess: isCreateVisitSuccess
    }
  ] = useCreateVisitMutation()

  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<AppointmentCreateSchemaData>({
    mode: "onChange",
    defaultValues: DEFAUL_DATA,
    resolver: zodResolver(appointmentSchemaFunction(slideIndex))
  })
  const WATCH_STARTED_AT = watch("startedAt")

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
      component: () => (
        <Patientdetails
          control={control}
          formValues={getValues}
          onSetStep={stepsMethods.handleSetSlideIndex}
        />
      )
    }
  ]

  const onHandleSubmit = handleSubmit(async (data: AppointmentCreateSchemaData) => {
    switch (slideIndex) {
      case 0:
        if (errors.service || errors.employee) {
          break
        }

        return stepsMethods.handleSetSlideIndex(1)
      case 1:
        if (errors.choosenTime) {
          break
        }

        if (currentIndex.value < slides.length - 1) {
          currentIndex.value += 1
        }

        return stepsMethods.handleSetSlideIndex(2)

      case 2:
        const editData = {
          ...data,
          startedAt: `${data.startedAt}T${data.choosenTime.startTime}`,
          finishedAt: `${data.startedAt}T${data.choosenTime.endTime}`
        }

        return await createVisit(editData)
          .unwrap()
          .then((res) => console.log(res, "CREATE VISIT"))
          .catch((err) => Alert.alert("Error", err.data.message))
    }
  })

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
        disabled={isCreateVisitLoading}
        containerStyles={{
          position: "absolute",
          bottom: 8,
          width: "100%"
        }}
        variant="primary"
      />

      <AppointmentCreateModals
        onClose={resetCreateVisit}
        visitData={createVisitData}
        onViewAppointment={resetCreateVisit}
        isVisible={isCreateVisitSuccess}
      />
    </View>
  )
}
