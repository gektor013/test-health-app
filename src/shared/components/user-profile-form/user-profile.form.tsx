import { ImagePickerAsset } from "expo-image-picker"
import React, { useState } from "react"
import { Control, Controller } from "react-hook-form"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"

import { colors } from "@/constants"
import { API_URL } from "@/constants/enviroments"
import { useTranslations } from "@/shared/hooks"
import { Profile } from "@/types/profile"
import { GENDER_DATA } from "@/utils/default-datas/drop-down"
import { dateHelper } from "@/utils/helpers/date"

import FastImage from "react-native-fast-image"
import { VectorExpoIcons } from "../expo-icons/vectorExpoIcons"
import { Button, DropdownComponent, SVGIcon, TextInput } from "../ui-kit"

interface Props {
  isEmailNeed?: boolean
  scrollEnabled?: boolean
  control: Control<Profile>
  image: ImagePickerAsset | string | null
  onImagePress: () => void
  handlePress?: {
    cb: () => void
    disabled: boolean
  }
}

export const UserProfileForm = ({
  image,
  control,
  isEmailNeed = true,
  scrollEnabled,
  onImagePress,
  handlePress
}: Props) => {
  const { t } = useTranslations()
  const [openDate, setOpenDate] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onImagePress} style={styles.avatarContainer}>
          {image ? (
            <>
              {typeof image === "string" ? (
                <FastImage
                  style={styles.image}
                  source={{
                    uri: API_URL + image
                  }}
                />
              ) : (
                <Image source={image} style={styles.image} />
              )}
            </>
          ) : (
            <React.Fragment>
              <SVGIcon name="empty_avatar" size={100} />
              <VectorExpoIcons
                type="Feather"
                name="edit"
                size={22}
                color={colors.green}
                style={styles.editIcon}
              />
            </React.Fragment>
          )}
        </Pressable>
      </View>

      <ScrollView
        overScrollMode="never"
        contentContainerStyle={{ gap: 16 }}
        scrollEnabled={scrollEnabled}
      >
        {isEmailNeed && (
          <>
            <TextInput
              label={t("Full name")}
              name="name"
              control={control}
              inputProps={{
                placeholder: t("Name")
              }}
            />

            <TextInput
              label={t("Email")}
              type="text"
              name="email"
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
              name="phone"
              control={control}
              inputProps={{
                maxLength: 17,
                placeholder: t("+1 (999) 111-0000"),
                keyboardType: "number-pad"
              }}
            />
          </>
        )}

        <Controller
          control={control}
          name="sex"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DropdownComponent
              data={GENDER_DATA}
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
          name="birthdate"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Text style={{ fontWeight: "600", marginBottom: -7 }}>
                {t("Date of birth")}
              </Text>

              <Button
                onPress={() => setOpenDate(true)}
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
                mode="date"
                open={openDate}
                date={(value || new Date()) as Date}
                maximumDate={new Date()}
                onConfirm={(date) => {
                  const localDate = dateHelper.getLocaleDateTime(date)
                  setOpenDate(false)
                  onChange(localDate)
                }}
                onCancel={() => {
                  setOpenDate(false)
                }}
              />
            </>
          )}
        />
      </ScrollView>
      {isEmailNeed && (
        <Button
          disabled={handlePress?.disabled}
          onPress={handlePress?.cb}
          title={t("Update profile")}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingTop: 40,
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
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50
  }
})
