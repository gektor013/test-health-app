import { useLocalSearchParams } from "expo-router"
import React, { useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"

import { usePostMediaObjectMutation } from "@/redux/services"
import { profileSchema } from "@/schemas/profile/profile.schema"
import { Button, UserProfileForm } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { Profile } from "@/types/profile"
import { SignUp } from "@/types/sign-up"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAppSelector } from "@/redux"
import { useCreateProfile } from "./hooks/useCreateProfile"

const DEFAULT_VALUES: Profile = {
  birthdate: "",
  email: "",
  sex: "",
  name: "",
  phone: ""
}

export const CompleteProfile = () => {
  const ref = useRef<BottomSheet>(null)
  const { email, name } = useLocalSearchParams<SignUp>()
  const { getImageInGalery, image } = useCreateProfile()
  const [postMediaObject] = usePostMediaObjectMutation()
  const aaa = useAppSelector((s) => s.auth)
  console.log(aaa)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Profile>({
    defaultValues: { ...DEFAULT_VALUES, email, name },
    resolver: zodResolver(profileSchema)
  })

  const handleCreateAccount: SubmitHandler<Profile> = async (data) => {
    if (image) {
      console.log(image, "Image")

      const upload = await postMediaObject(image.uri)
        .unwrap()
        .catch((e) => console.log(e, "ERROR Upload"))
    }
  }

  const handleOpeBottom = async () => {
    ref.current?.snapToPosition("25%")
  }

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text style={{ textAlign: "center" }}>
        Don’t worry, only you can see your personal data. No one else will be able to see
        it.
      </Text>
      <UserProfileForm
        image={image}
        control={control}
        isEmailNeed={false}
        onImagePress={handleOpeBottom}
      />
      <Button
        title="Complete profile"
        containerStyles={{ marginTop: 16 }}
        onPress={handleSubmit(handleCreateAccount)}
      />

      <CustomBottomSheet ref={ref}>
        <View style={{ gap: 16 }}>
          <Button onPress={() => getImageInGalery("camera")} title="Camera" />
          <Button onPress={() => getImageInGalery("gallery")} title="Gallery" />
        </View>
      </CustomBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({})
