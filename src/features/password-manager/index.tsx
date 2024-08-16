import { colors } from "@/constants"
import { Button, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import React from "react"
import { useForm } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"

export const PasswordManager = () => {
  const { t } = useTranslations()
  const { control } = useForm()
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Password"
          control={control}
          name="password"
          type="password"
          inputProps={{
            placeholder: t("Enter your password"),
            style: styles.input
          }}
        />
        <Pressable style={styles.pressable}>
          <Text style={styles.text}>{t("Forgot password?")}</Text>
        </Pressable>
        <TextInput
          label="New password"
          control={control}
          name="password"
          type="password"
          inputProps={{
            placeholder: t("Enter your password"),
            style: styles.input
          }}
        />
        <TextInput
          label="Confirm password"
          control={control}
          name="password"
          type="password"
          inputProps={{
            placeholder: t("Enter your password"),
            style: styles.input
          }}
        />
      </View>
      <Button title="Change Password" style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  inputContainer: {
    gap: 16
  },
  input: {
    flexGrow: 1,
    fontSize: 14
  },
  pressable: {
    alignItems: "flex-end"
  },
  text: {
    color: colors.green
  },
  button: {
    borderRadius: 12
  }
})
