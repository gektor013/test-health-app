import { colors } from "@/constants"
import { Button } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, View } from "react-native"

export const Settings = () => {
  const { t } = useTranslations()

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => {
            router.navigate("/password-manager")
          }}
          title={t("Password manager")}
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
          onPress={() => {}}
          title={t("Delete account")}
          variant="outline"
          containerStyles={styles.btnContainer}
          iconRight={{
            icon: "arrow_right",
            color: colors.black,
            size: 14
          }}
          titleStyle={styles.btnTitle}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    gap: 16
  },
  buttonsContainer: {
    gap: 8,
    marginBottom: 50
  },
  btnContainer: {
    backgroundColor: colors.light_gray,
    borderColor: colors.light_gray,
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  btnTitle: {
    color: colors.black
  }
})
