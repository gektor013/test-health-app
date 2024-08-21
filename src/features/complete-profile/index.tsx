import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"
import { useForm } from "react-hook-form"

import { Button, UserProfileForm } from "@/shared/components"
import { SignUp } from "@/types/sign-up"

export const CompleteProfile = () => {
  const signUpData = useLocalSearchParams<SignUp>()
  const { control } = useForm()
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text style={{ textAlign: "center" }}>
        Don’t worry, only you can see your personal data. No one else will be able to see
        it.
      </Text>
      <UserProfileForm control={control} isEmailNeed={false} />
      <Button title="Complete profile" containerStyles={{ marginTop: 16 }} />
    </View>
  )
}

const styles = StyleSheet.create({})
