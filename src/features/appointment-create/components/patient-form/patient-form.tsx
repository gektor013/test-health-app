import { CheckBox, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"
import { useForm } from "react-hook-form"
import { Text, View } from "react-native"

const defaultValues = {
  email: "",
  password: ""
}

const width = commonHelpers.getDimensionsParams().width - 32
export const Patientdetails = () => {
  const { t } = useTranslations()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues
  })

  return (
    <View style={{ flex: 1, gap: 24, maxWidth: width }}>
      <Text
        style={{
          fontWeight: "600",
          lineHeight: 17
        }}
      >
        {t("Patient Details")}
      </Text>

      <View style={{ gap: 16 }}>
        <TextInput
          label={t("Full name")}
          name="email"
          control={control}
          inputProps={{
            placeholder: t("Name")
          }}
        />

        <TextInput
          label={t("Phone number")}
          name="email"
          control={control}
          inputProps={{
            placeholder: t("+0 (000) 000-00-00")
          }}
        />

        <TextInput
          label={t("Male")}
          name="email"
          control={control}
          inputProps={{
            placeholder: t("Male"),
            onPress: () => {
              console.log("asda")
            },
            editable: false
          }}
          iconName="arrow_down"
        />

        <TextInput
          label={t("Date of birth")}
          name="email"
          control={control}
          inputProps={{
            placeholder: t("June/01/1990"),
            onPress: () => {
              console.log("asda")
            },
            editable: false
          }}
          iconName="standart_calendar"
        />

        <TextInput
          label={t("Uploaded documents")}
          name="email"
          control={control}
          inputProps={{
            placeholder: t("No documents uploaded"),
            onPress: () => {
              console.log("asda")
            },
            editable: false
          }}
          iconName="arrow_right"
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <CheckBox variant="square" isChecked={true} onPress={() => {}} />
          <Text>Booking for another person</Text>
        </View>
      </View>
    </View>
  )
}
