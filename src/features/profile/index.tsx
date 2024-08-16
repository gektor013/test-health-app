import { colors } from "@/constants"
import { useAppSelector } from "@/redux"
import { Button, SVGIcon, Switch, VectorExpoIcons } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useActions, useTranslations } from "@/shared/hooks"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { router } from "expo-router"
import React, { useRef, useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("window")

export const Profile = () => {
  const { t } = useTranslations()
  const { logOut } = useActions()

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

  const ref = useRef<BottomSheet>(null)

  const auth = useAppSelector((s) => s.auth)
  console.log(auth)

  return (
    <>
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
              onPress={() => {
                if (ref.current) ref.current.snapToPosition("40%")
              }}
              containerStyles={{ backgroundColor: "#F2FDFC", marginTop: 8 }}
            />
          </View>
        </ScrollView>
      </View>

      <CustomBottomSheet ref={ref}>
        <View style={{ gap: 24 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 16,
              gap: 16
            }}
          >
            <Text style={{ fontSize: 17, lineHeight: 21 }}>Logout</Text>
            <View
              style={{ borderWidth: 1, borderColor: colors.light_gray, width: "100%" }}
            />
          </View>

          <View style={{ gap: 16 }}>
            <Button onPress={() => logOut()} title="Yes, Logout" />
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => ref.current?.close()}
              containerStyles={{ borderColor: colors.red }}
              titleStyle={{ color: colors.red }}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </>
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
