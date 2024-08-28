import { ImagePickerAsset } from "expo-image-picker"
import { router } from "expo-router"
import { useRef } from "react"
import { Control, SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form"
import { Alert } from "react-native"

import { useAppSelector } from "@/redux"
import { useUploadImageMutation } from "@/redux/services"
import { useEditUserDataMutation } from "@/redux/services/user-api"
import { profileSchema } from "@/schemas/profile/profile.schema"
import { useActions, useGetCameraPermissions } from "@/shared/hooks"
import { Profile } from "@/types/profile"
import { LoginResponse } from "@/types/user"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { zodResolver } from "@hookform/resolvers/zod"

interface ReturnData {
  isLoading: boolean
  control: Control<Profile>
  image: ImagePickerAsset | null
  userData: LoginResponse | null
  ref: React.RefObject<BottomSheet>
  handleOpeBottom: () => void
  handleEditProfile: SubmitHandler<Profile>
  handleSubmit: UseFormHandleSubmit<Profile>
  getImageInGalery: (status: "camera" | "gallery") => Promise<void>
}

export const useUpdateUserProfile = (): ReturnData => {
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
    const id = userData?.id ? userData?.id : userData?.userId

    if (!id) return
    let uploadImage

    if (image) {
      uploadImage = await handleUploadImage()
    }

    await editUserData({
      ...data,
      userId: id.toString(),
      image: uploadImage ? uploadImage : userData?.image
    })
      .unwrap()
      .then((res) => {
        updateUserData(res)
      })
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

  return {
    ref,
    image,
    control,
    userData,
    isLoading: isEditLoading || isUploadLoading,
    handleSubmit,
    handleOpeBottom,
    getImageInGalery,
    handleEditProfile
  }
}
