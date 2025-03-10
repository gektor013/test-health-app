import { StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"
import { useState } from "react"
import { router } from "expo-router"
import { Control, Controller, UseFormGetValues } from "react-hook-form"

import { colors } from "@/constants"
import { useAppSelector } from "@/redux"
import { Button, DropdownComponent, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { GENDER_DATA } from "@/utils/default-datas/drop-down"
import { commonHelpers } from "@/utils/helpers/common"
import { dateHelper } from "@/utils/helpers/date"

import { FinalAppointment } from "../final-appointment/final-appointment"

const width = commonHelpers.getDimensionsParams().width - 32

interface Props {
  formValues: UseFormGetValues<AppointmentCreateSchemaData>
  control: Control<AppointmentCreateSchemaData>
  onSetStep: (step: number) => void
}

export const Patientdetails = ({ control, formValues, onSetStep }: Props) => {
  const { t } = useTranslations()
  const [open, setOpen] = useState(false)
  const { uploadCountFiles } = useAppSelector((s) => s.media)

  return (
    <View style={styles.mainConatiner}>
      <Text style={styles.title}>{t("Patient Details")}</Text>

      <View style={{ gap: 16 }}>
        <TextInput
          label={t("Full name")}
          name="client.name"
          control={control}
          inputProps={{
            editable: false,
            placeholder: t("Name")
          }}
        />

        <TextInput
          label={t("Phone number")}
          type="phone"
          name="client.phone"
          control={control}
          inputProps={{
            maxLength: 17,
            editable: false,
            placeholder: t("+0 (000) 000-00-00"),
            keyboardType: "number-pad"
          }}
        />

        <Controller
          control={control}
          name="client.sex"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DropdownComponent
              data={GENDER_DATA}
              label="Gender"
              disabled={true}
              plaseholder="Male"
              isError={!!error}
              value={value ?? null}
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
                disabled
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
                  const localDate = dateHelper.getLocaleDateTime(date)

                  setOpen(false)
                  onChange(localDate)
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
            router.navigate({
              pathname: "/upload-document",
              params: {
                isUploadDocument: 1
              }
            })
          }}
          title={
            uploadCountFiles > 0
              ? t(`Uploaded ${uploadCountFiles} documents`)
              : t("No documents uploaded")
          }
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
            onPress={() => onSetStep(0)}
            description={t(formValues("service.name"))}
          />
          <FinalAppointment
            title={"Therapist"}
            onPress={() => onSetStep(0)}
            description={t(formValues("employee.name"))}
          />
          <FinalAppointment
            onPress={() => onSetStep(1)}
            title={"Booking date and time"}
            description={formValues("startedAt")}
            subDescription={`${formValues("choosenTime.startTime")}-${formValues(
              "choosenTime.endTime"
            )}`}
          />
        </View>
      </View>
    </View>
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
