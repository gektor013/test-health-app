import React, { useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { useAppSelector } from "@/redux"
import { useEditUserDataMutation } from "@/redux/services/user-api"
import { profileSchema } from "@/schemas/profile/profile.schema"
import { Button, UserProfileForm } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useActions, useGetCameraPermissions } from "@/shared/hooks"
import { Profile } from "@/types/profile"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Alert, View } from "react-native"

export const UserProfile = () => {
  const ref = useRef<BottomSheet>(null)
  const { updateUserData } = useActions()
  const userData = useAppSelector((s) => s.auth.user)
  const { getImageInGalery, image } = useGetCameraPermissions()
  const [editUserData, { isLoading: isEditLoading }] = useEditUserDataMutation()

  const { control, handleSubmit } = useForm<Profile>({
    defaultValues: {
      ...userData,
      birthdate: userData?.birthdate && new Date(userData?.birthdate)
    },
    resolver: zodResolver(profileSchema)
  })

  const handleOpeBottom = async () => {
    ref.current?.snapToPosition("25%")
  }

  const handleEditProfile: SubmitHandler<Profile> = async (data: Profile) => {
    if (!userData?.id) return
    await editUserData({ ...data, userId: userData?.id.toString() })
      .unwrap()
      .then((res) => updateUserData(res))
      .then(router.back)
      .catch(() => Alert.alert("Something went wrong"))
  }

  return (
    <>
      <UserProfileForm
        onImagePress={handleOpeBottom}
        image={userData?.image as string}
        control={control}
        scrollEnabled={false}
        handlePress={{
          disabled: isEditLoading,
          cb: handleSubmit(handleEditProfile)
        }}
      />
      <CustomBottomSheet ref={ref}>
        <View style={{ gap: 16 }}>
          <Button onPress={() => getImageInGalery("camera")} title="Camera" />
          <Button onPress={() => getImageInGalery("gallery")} title="Gallery" />
        </View>
      </CustomBottomSheet>
    </>
  )
}
