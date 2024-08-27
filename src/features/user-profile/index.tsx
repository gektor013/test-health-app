import React, { useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { useAppSelector } from "@/redux"
import { useUploadImageMutation } from "@/redux/services"
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
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()

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
    let uploadImage

    if (image) {
      uploadImage = await handleUploadImage()
    }

    await editUserData({
      ...data,
      userId: userData?.id.toString(),
      image: uploadImage ? uploadImage : userData?.image
    })
      .unwrap()
      .then((res) => updateUserData(res))
      .then(router.back)
      .catch(() => Alert.alert("Something went wrong"))
  }

  const handleUploadImage = async () => {
    return await uploadImage(image?.uri as string)
      .unwrap()
      .then((res) => {
        const { contentUrl } = JSON.parse(res.body)

        return contentUrl
      })
      .catch(() => Alert.alert("Error upload image"))
  }

  return (
    <>
      <UserProfileForm
        onImagePress={handleOpeBottom}
        image={image ? image : (userData?.image as string)}
        control={control}
        scrollEnabled={false}
        handlePress={{
          cb: handleSubmit(handleEditProfile),
          disabled: isEditLoading || isUploadLoading
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
