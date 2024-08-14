import { useState } from "react"
import { Control, Controller, UseFormGetValues } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"

import { Button, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"

import { colors } from "@/constants"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { dateHelper } from "@/utils/helpers/date"
import { router } from "expo-router"
import { DropdownComponent } from "../dropdown/dropdown"
import { FinalAppointment } from "../final-appointment/final-appointment"

const data = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" }
]

const width = commonHelpers.getDimensionsParams().width - 32

interface Props {
  formValues: UseFormGetValues<AppointmentCreateSchemaData>
  control: Control<AppointmentCreateSchemaData>
}

export const Patientdetails = ({ control, formValues }: Props) => {
  const { t } = useTranslations()
  const [open, setOpen] = useState(false)

  return (
    <>
      <View style={styles.mainConatiner}>
        <Text style={styles.title}>{t("Patient Details")}</Text>

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
              placeholder: t("+0 (000) 000-00-00"),
              maxLength: 17
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

          <Controller
            control={control}
            name="client.birthdate"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Text style={{ fontWeight: "600", marginBottom: -7 }}>
                  {t("Date of birth")}
                </Text>

                <Button
                  onPress={() => setOpen(true)}
                  title={
                    value
                      ? dateHelper.formatedData(value ?? "", "DD.MM.YYYY")
                      : t("June/01/1990")
                  }
                  variant="outline"
                  containerStyles={[
                    styles.btnContainer,
                    {
                      borderColor: error
                        ? colors.red
                        : value
                        ? colors.green
                        : styles.btnContainer.borderColor
                    }
                  ]}
                  iconRight={{
                    icon: "arrow_right",
                    color: colors.dark_gray,
                    size: 16
                  }}
                  titleStyle={{
                    color: colors.dark_gray
                  }}
                />

                <DatePicker
                  modal
                  open={open}
                  mode="date"
                  date={(value as Date) || new Date()}
                  maximumDate={new Date()}
                  onConfirm={(date) => {
                    setOpen(false)
                    onChange(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </>
            )}
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
            <FinalAppointment
              title={"Type of visit"}
              description={t(formValues("service.name"))}
            />
            <FinalAppointment
              title={"Therapist"}
              description={t(formValues("employee.name"))}
            />
            <FinalAppointment
              title={"Booking date and time"}
              description={formValues("startedAt")}
              subDescription={`${formValues("choosenTime.startTime")}-${formValues(
                "choosenTime.endTime"
              )}`}
            />
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
