import { Alert, StyleSheet, View } from "react-native"
import React from "react"
import { router } from "expo-router"
import { SubmitHandler, useForm } from "react-hook-form"

import { colors } from "@/constants"
import { useAppSelector } from "@/redux"
import { useUpdatePasswordMutation } from "@/redux/services/user-api"
import { Button, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"
import { zod, zodResolver } from "@/utils/zod"

const schema = zod
  .object({
    password: zod.string().min(6, "Password cannot be empty"),
    confirmPassword: zod.string().min(6, "Confirm Password cannot be empty")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

type Password = zod.infer<typeof schema>

const DEFAULT_VALUE: Password = {
  password: "",
  confirmPassword: ""
}
export const PasswordManager = () => {
  const { t } = useTranslations()
  const userData = useAppSelector((s) => s.auth.user)

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const { control, handleSubmit } = useForm<Password>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(schema)
  })

  const handleUpdatePassword: SubmitHandler<Password> = async (data) => {
    const id = userData?.id ? userData?.id : userData?.userId

    if (!id) return
    await updatePassword({ ...data, id })
      .unwrap()
      .then(() => router.push("/tabs/profile"))
      .catch(() => Alert.alert("Something went wrong"))
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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
          name="confirmPassword"
          type="password"
          inputProps={{
            placeholder: t("Enter your password"),
            style: styles.input
          }}
        />
      </View>
      <Button
        disabled={isLoading}
        onPress={handleSubmit(handleUpdatePassword)}
        title="Change Password"
        variant="primary"
      />
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
