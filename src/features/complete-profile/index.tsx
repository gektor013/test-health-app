import { router, useLocalSearchParams } from "expo-router"
import React, { useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Alert, Text, View } from "react-native"

import { useAppSelector } from "@/redux"
import { usePostMediaObjectMutation } from "@/redux/services"
import { useEditUserDataMutation } from "@/redux/services/user-api"
import { profileSchema } from "@/schemas/profile/profile.schema"
import { Button, UserProfileForm } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useActions } from "@/shared/hooks"
import { Profile } from "@/types/profile"
import { SignUp } from "@/types/sign-up"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreateProfile } from "./hooks/useCreateProfile"

const DEFAULT_VALUES: Profile = {
  birthdate: "",
  email: "",
  sex: "",
  name: "",
  phone: ""
}

export const CompleteProfile = () => {
  const { logIn } = useActions()
  const ref = useRef<BottomSheet>(null)
  const token = useAppSelector((s) => s.auth.token)
  const { getImageInGalery, image } = useCreateProfile()
  const { email, name, id } = useLocalSearchParams<SignUp & { id: string }>()

  const [postMediaObject] = usePostMediaObjectMutation()
  const [editUserData] = useEditUserDataMutation()

  const { control, handleSubmit } = useForm<Profile>({
    defaultValues: { ...DEFAULT_VALUES, email, name },
    resolver: zodResolver(profileSchema)
  })

  const handleCreateAccount: SubmitHandler<Profile> = async (data) => {
    let upload

    if (image) {
      upload = await postMediaObject(image.uri)
        .unwrap()
        .then((res) => {
          const { contentUrl } = JSON.parse(res.body)

          return contentUrl
        })
        .catch((e) => console.log(e, "ERROR Upload"))
    }

    await editUserData({ ...data, image: upload, userId: id })
      .unwrap()
      .then((res) => {
        logIn({ ...res, token: token as string })
        router.push("/")
      })
      .catch(() => {
        Alert.alert("Something went wrong")
      })
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
