import { useState } from "react"
import { Control, Controller } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"

import { Button, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"

import { colors } from "@/constants"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { router } from "expo-router"
import { DropdownComponent } from "../dropdown/dropdown"
import { FinalAppointment } from "../final-appointment/final-appointment"

const defaultValues = {
  email: "",
  password: ""
}

const data = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" }
]

const width = commonHelpers.getDimensionsParams().width - 32

interface Props {
  control: Control<AppointmentCreateSchemaData>
}

export const Patientdetails = ({ control }: Props) => {
  const { t } = useTranslations()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <>
      <View style={styles.mainConatiner}>
        <Text style={styles.title}>{t("Patient Details")}</Text>

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />

        <View style={{ gap: 16 }}>
          <TextInput
            label={t("Full name")}
            name="client.name"
            control={control}
            inputProps={{
              placeholder: t("Name")
            }}
          />

          <TextInput
            label={t("Phone number")}
            type="phone"
            name="client.phone"
            control={control}
            inputProps={{
              placeholder: t("+0 (000) 000-00-00")
            }}
          />

          <Controller
            control={control}
            name="client.sex"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DropdownComponent
                data={data}
                label="Gender"
                plaseholder="Male"
                isError={!!error}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <TextInput
            label={t("Date of birth")}
            name="client.birthdate"
            control={control}
            inputProps={{
              placeholder: t("June/01/1990"),
              onPress: () => {
                setOpen(true)
              },
              editable: false
            }}
            iconName="standart_calendar"
          />

          <Text style={{ fontWeight: "600", marginBottom: -7 }}>
            {t("Uploaded documents")}
          </Text>

          <Button
            onPress={() => {
              router.navigate("/upload-document")
            }}
            title={t("No documents uploaded")}
            variant="outline"
            containerStyles={styles.btnContainer}
            iconRight={{
              icon: "arrow_right",
              color: colors.dark_gray,
              size: 16
            }}
            titleStyle={{
              color: colors.dark_gray
            }}
          />

          {/* <View style={styles.checkboxContainer}>
            <CheckBox variant="square" isChecked={true} onPress={() => {}} />
            <Text>Booking for another person</Text>
          </View> */}

          <View style={styles.finalAppointmentContainer}>
            <Text style={styles.appointmentTitle}>{t("Finalize your appointment")}</Text>
            <FinalAppointment t={t} />
            <FinalAppointment t={t} />
            <FinalAppointment t={t} />
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    gap: 24,
    maxWidth: width,
    marginBottom: 100
  },
  title: {
    fontWeight: "600",
    lineHeight: 17
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  finalAppointmentContainer: {
    gap: 16
  },
  appointmentTitle: {
    fontWeight: "600"
  },
  btnContainer: {
    backgroundColor: colors.light_gray,
    borderColor: colors.light_gray,
    justifyContent: "space-between",
    paddingHorizontal: 16
  }
})
