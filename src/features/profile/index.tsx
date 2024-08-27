import { Image, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import React, { useRef, useState } from "react"
import { router } from "expo-router"

import { colors } from "@/constants"
import { API_URL } from "@/constants/enviroments"
import { useAppSelector } from "@/redux"
import { Button, SVGIcon, Switch } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useActions, useTranslations } from "@/shared/hooks"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"

import { styles } from "./_style"

export const Profile = () => {
  const { t } = useTranslations()
  const { logOut } = useActions()

  const ref = useRef<BottomSheet>(null)
  const userData = useAppSelector((s) => s.auth.user)
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {userData?.image ? (
              <Image source={{ uri: API_URL + userData?.image }} style={styles.avatar} />
            ) : (
              <SVGIcon name="empty_avatar" size={60} />
            )}
            <Text style={styles.name}>{userData?.name}</Text>
          </View>
        </View>

        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => {
                router.navigate("/user-profile")
              }}
              title={t("Your profile")}
              variant="outline"
              containerStyles={styles.btnContainer}
              iconRight={{
                icon: "arrow_right",
                color: colors.black,
                size: 14
              }}
              titleStyle={styles.btnTitle}
            />

            <Button
              onPress={() => {
                router.navigate("/upload-document")
              }}
              title={t("Uploaded documents")}
              variant="outline"
              containerStyles={styles.btnContainer}
              iconRight={{
                icon: "arrow_right",
                color: colors.black,
                size: 14
              }}
              titleStyle={styles.btnTitle}
            />

            <Button
              onPress={() => {
                router.navigate("/settings")
              }}
              title={t("Settings")}
              variant="outline"
              containerStyles={styles.btnContainer}
              iconRight={{
                icon: "arrow_right",
                color: colors.black,
                size: 14
              }}
              titleStyle={styles.btnTitle}
            />

            <Button
              onPress={toggleSwitch}
              title={t("Notification")}
              variant="outline"
              containerStyles={styles.btnContainer}
              customRenderComponent={() => (
                <Switch
                  handleOnPress={toggleSwitch}
                  value={isEnabled}
                  inActiveTrackColor={colors.gray}
                  activeTrackColor={colors.green}
                  thumbColor={colors.white}
                />
              )}
              titleStyle={styles.btnTitle}
            />

            <Button
              onPress={() => {
                router.navigate("/faq")
              }}
              title={t("FAQ’s")}
              variant="outline"
              containerStyles={styles.btnContainer}
              iconRight={{
                icon: "arrow_right",
                color: colors.black,
                size: 14
              }}
              titleStyle={styles.btnTitle}
            />

            <Button
              onPress={() => {
                router.navigate("/upload-document")
              }}
              title={t("Terms & Conditions")}
              variant="outline"
              containerStyles={styles.btnContainer}
              iconRight={{
                icon: "arrow_right",
                color: colors.black,
                size: 14
              }}
              titleStyle={styles.btnTitle}
            />

            <Button
              title="Log Out"
              variant="outline"
              icon="log_out"
              onPress={() => {
                if (ref.current) ref.current.snapToPosition("40%")
              }}
              containerStyles={styles.logoutBtnContainer}
            />
          </View>
        </ScrollView>
      </View>

      <CustomBottomSheet ref={ref}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>{t("Logout")}</Text>
            <View style={styles.bottomSheetDivider} />
          </View>

          <View style={styles.bottomSheetButtonsContainer}>
            <Button onPress={() => logOut()} title={t("Yes, Logout")} />
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => ref.current?.close()}
              containerStyles={styles.bottomSheetCancelBtnContainer}
              titleStyle={styles.bottomSheetCancelBtnTitle}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </>
  )
}
