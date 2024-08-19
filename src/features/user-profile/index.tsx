import { ScrollView, StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"
import React from "react"
import { Controller, useForm } from "react-hook-form"

import { colors } from "@/constants"
import {
  Button,
  DropdownComponent,
  SVGIcon,
  TextInput,
  VectorExpoIcons
} from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { GENDER_DATA } from "@/utils/default-datas/drop-down"
import { dateHelper } from "@/utils/helpers/date"

export const UserProfile = () => {
  const { control } = useForm()
  const { t } = useTranslations()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <SVGIcon name="empty_avatar" size={100} />
          <VectorExpoIcons
            type="Feather"
            name="edit"
            size={22}
            color={colors.green}
            style={styles.editIcon}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <TextInput
          label={t("Full name")}
          name="client.name"
          control={control}
          inputProps={{
            placeholder: t("Name")
          }}
        />

        <TextInput
          label={t("Email")}
          type="phone"
          name="client.phone"
          control={control}
          inputProps={{
            maxLength: 17,
            placeholder: t("example@email.com"),
            keyboardType: "email-address"
          }}
        />

        <TextInput
          label={t("Phone number")}
          type="phone"
          name="client.phone"
          control={control}
          inputProps={{
            maxLength: 17,
            placeholder: t("+1 (999) 111-0000"),
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
              plaseholder="Male"
              isError={false}
              value={value}
              onChange={() => {}}
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
                onPress={() => {}}
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
                open={false}
                mode="date"
                date={(value as Date) || new Date()}
                maximumDate={new Date()}
                onConfirm={(date) => {
                  // setOpen(false)
                  // onChange(date)
                }}
                onCancel={() => {
                  // setOpen(false)
                }}
              />
            </>
          )}
        />
      </ScrollView>
      <Button title={t("Update profile")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    gap: 16,
    justifyContent: "space-between"
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16
  },
  avatarContainer: {
    position: "relative"
  },
  editIcon: {
    position: "absolute",
    right: 1,
    bottom: 5
  },
  btnContainer: {
    backgroundColor: colors.light_gray,
    borderColor: colors.light_gray,
    justifyContent: "space-between",
    paddingHorizontal: 16
  }
})
