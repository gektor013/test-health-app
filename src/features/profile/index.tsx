import { colors } from "@/constants"
import { Button, SVGIcon, Switch, VectorExpoIcons } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { router } from "expo-router"
import React, { useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"

const { width } = Dimensions.get("window")

export const Profile = () => {
  const { t } = useTranslations()

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("Mounting")

  //     return () => {
  //       setIndex(0)

  //       // Do something that should run on blur
  //     }
  //   }, [])
  // )
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  return (
    <View style={{ flex: 1, paddingTop: 40, gap: 16 }}>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 16 }}>
        <View style={{ position: "relative" }}>
          <SVGIcon name="empty_avatar" size={60} />
          <VectorExpoIcons
            type="Feather"
            name="edit"
            size={15}
            color={colors.green}
            style={{ position: "absolute", right: 1, bottom: 5 }}
          />
        </View>
        <Text style={{ fontSize: 19, lineHeight: 23 }}>Kevin Lablabce</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 8, marginBottom: 50 }}>
          <Button
            onPress={() => {
              router.navigate("/upload-document")
            }}
            title={t("Your profile")}
            variant="outline"
            containerStyles={styles.btnContainer}
            iconRight={{
              icon: "arrow_right",
              color: colors.black,
              size: 14
            }}
            titleStyle={{
              color: colors.black
            }}
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
            titleStyle={{
              color: colors.black
            }}
          />

          <Button
            onPress={() => {
              router.navigate("/upload-document")
            }}
            title={t("Settings")}
            variant="outline"
            containerStyles={styles.btnContainer}
            iconRight={{
              icon: "arrow_right",
              color: colors.black,
              size: 14
            }}
            titleStyle={{
              color: colors.black
            }}
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
            titleStyle={{
              color: colors.black
            }}
          />

          <Button
            onPress={() => {
              router.navigate("/upload-document")
            }}
            title={t("FAQ’s")}
            variant="outline"
            containerStyles={styles.btnContainer}
            iconRight={{
              icon: "arrow_right",
              color: colors.black,
              size: 14
            }}
            titleStyle={{
              color: colors.black
            }}
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
            titleStyle={{
              color: colors.black
            }}
          />

          <Button
            title="Log Out"
            variant="outline"
            icon="log_out"
            onPress={() => {}}
            containerStyles={{ backgroundColor: "#F2FDFC", marginTop: 8 }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.light_gray,
    borderColor: colors.light_gray,
    justifyContent: "space-between",
    paddingHorizontal: 16
  }
})
