import { useCallback } from "react"
import { Control, useForm, UseFormGetValues } from "react-hook-form"
import { Alert } from "react-native"
import { SharedValue } from "react-native-reanimated"

import { useAppSelector } from "@/redux"
import {
  useGetAllEmployeesQuery,
  useGetEmployeeSchduleQuery
} from "@/redux/services/employee-api"
import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { useCreateVisitMutation } from "@/redux/services/visit-api"
import { appointmentSchemaFunction } from "@/schemas/appointment-create/appointment-create.schema"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { EmployeesResponse, ScheduleEmloyeeTime } from "@/types/employees/employees.type"
import { ServiceResponse } from "@/types/service/service.type"
import { TransformedData } from "@/types/transformData"
import { APPOINTMENT_CREATE_DEFAUL_DATA } from "@/utils/default-datas/appointment.dd"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
  slideIndex: number
  currentIndex: SharedValue<number>

  stepsMethods: {
    handleSetSlideIndex: (index: number) => void
    onBackPress: () => void
  }
}

interface ReturneData {
  visitData: {
    createVisitData: AppointmentCreateSchemaData | undefined
    resetCreateVisit: () => void
    isCreateVisitLoading: boolean
    isCreateVisitSuccess: boolean
  }
  datas: {
    servicesData: TransformedData<ServiceResponse> | undefined
    employeeData: TransformedData<EmployeesResponse> | undefined
    scheduleData: ScheduleEmloyeeTime[] | undefined
    isScheduleLoading: boolean
    isEmployeeLoading: boolean
  }
  form: {
    control: Control<AppointmentCreateSchemaData>
    getValues: UseFormGetValues<AppointmentCreateSchemaData>
  }
  handleBackPress: () => void
  onHandleSubmit: () => void
}

export const useCreateAppointment = ({
  slideIndex,
  stepsMethods,
  currentIndex
}: Props): ReturneData => {
  const userData = useAppSelector((s) => s.auth.user)

  const {
    control,
    watch,
    reset,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<AppointmentCreateSchemaData>({
    mode: "onChange",
    defaultValues: {
      ...APPOINTMENT_CREATE_DEFAUL_DATA,
      client: {
        ...userData,
        birthdate: userData?.birthdate && new Date(userData?.birthdate)
      }
    },
    resolver: zodResolver(appointmentSchemaFunction(slideIndex))
  })
  const WATCH_STARTED_AT = watch("startedAt")

  console.log(errors, getValues(), "ERORR")

  // REQUESTS
  const { data: servicesData } = useGetAllServicesQuery()
  const { data: employeeData, isFetching: isEmployeeLoading } = useGetAllEmployeesQuery()

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

  const [
    createVisit,
    {
      data: createVisitData,
      reset: resetCreateVisit,
      isLoading: isCreateVisitLoading,
      isSuccess: isCreateVisitSuccess
    }
  ] = useCreateVisitMutation()

  // FUNCTION TO SUBMIT FORM WITH VALIDATION
  // CHECK ABOUT VALIDATION MANAGEMENT
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

        if (currentIndex.value < 2) {
          currentIndex.value += 1
        }

        return stepsMethods.handleSetSlideIndex(2)

      case 2:
        const editData = {
          ...data,
          startedAt: `${data.startedAt}T${data.choosenTime.startTime}`,
          finishedAt: `${data.startedAt}T${data.choosenTime.endTime}`
        }

        return await createVisit({
          ...editData
        })
          .unwrap()
          .catch((err) => Alert.alert("Error", err.data.message))
    }
  })

  const handleBackPress = useCallback(() => {
    reset(APPOINTMENT_CREATE_DEFAUL_DATA)
    stepsMethods.onBackPress()
  }, [])

  return {
    visitData: {
      createVisitData,
      resetCreateVisit,
      isCreateVisitLoading,
      isCreateVisitSuccess
    },
    datas: {
      servicesData,
      employeeData,
      scheduleData,
      isScheduleLoading,
      isEmployeeLoading
    },
    form: {
      control,
      getValues
    },
    handleBackPress,
    onHandleSubmit
  }
}
