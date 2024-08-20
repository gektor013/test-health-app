import { router } from "expo-router"
import React, { useRef, useState } from "react"
import { Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { colors } from "@/constants"
import { Button, SVGIcon, Switch, VectorExpoIcons } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useActions, useTranslations } from "@/shared/hooks"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"

import { styles } from "./_style"

export const Profile = () => {
  const { t } = useTranslations()
  const { logOut } = useActions()

  const ref = useRef<BottomSheet>(null)
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <SVGIcon name="empty_avatar" size={60} />
            <VectorExpoIcons
              type="Feather"
              name="edit"
              size={15}
              color={colors.green}
              style={styles.editIcon}
            />
          </View>
          <Text style={styles.name}>{t("Kevin Lablabce")}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
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
