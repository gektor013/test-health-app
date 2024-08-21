import { useLocalSearchParams } from "expo-router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"

import { profileSchema } from "@/schemas/profile/profile.schema"
import { Button, UserProfileForm } from "@/shared/components"
import { Profile } from "@/types/profile"
import { SignUp } from "@/types/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"

const DEFAULT_VALUES: Profile = {
  birthdate: "",
  email: "",
  sex: "",
  name: "",
  phone: ""
}

export const CompleteProfile = () => {
  const { email, name } = useLocalSearchParams<SignUp>()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Profile>({
    defaultValues: { ...DEFAULT_VALUES, email, name },
    resolver: zodResolver(profileSchema)
  })
  console.log(errors, "Errors")

  const handleCreateAccount: SubmitHandler<Profile> = (data) => {
    console.log(data, "DATA")
  }

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text style={{ textAlign: "center" }}>
        Don’t worry, only you can see your personal data. No one else will be able to see
        it.
      </Text>
      <UserProfileForm control={control} isEmailNeed={false} />
      <Button
        title="Complete profile"
        containerStyles={{ marginTop: 16 }}
        onPress={handleSubmit(handleCreateAccount)}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
