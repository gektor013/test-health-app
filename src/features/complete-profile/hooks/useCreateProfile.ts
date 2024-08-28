import { Alert } from "react-native"
import { useRef } from "react"
import { ImagePickerAsset } from "expo-image-picker"
import { router, useLocalSearchParams } from "expo-router"
import { Control, SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form"

import { useAppSelector } from "@/redux"
import { useUploadImageMutation } from "@/redux/services"
import { useEditUserDataMutation } from "@/redux/services/user-api"
import { profileSchema } from "@/schemas/profile/profile.schema"
import { useActions, useGetCameraPermissions } from "@/shared/hooks"
import { Profile } from "@/types/profile"
import { SignUp } from "@/types/sign-up"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import { zodResolver } from "@hookform/resolvers/zod"

interface ReturnData {
  ref: React.RefObject<BottomSheetMethods>
  image: ImagePickerAsset | null
  control: Control<Profile>
  handleOpeBottom: () => Promise<void>
  handleSubmit: UseFormHandleSubmit<Profile>
  handleCreateAccount: SubmitHandler<Profile>
  getImageInGalery: (status: "camera" | "gallery") => Promise<void>
}

const DEFAULT_VALUES: Profile = {
  birthdate: "",
  email: "",
  sex: "",
  name: "",
  phone: ""
}

export const useCreateProfile = (): ReturnData => {
  const { logIn } = useActions()
  const ref = useRef<BottomSheet>(null)
  const token = useAppSelector((s) => s.auth.token)
  const { getImageInGalery, image } = useGetCameraPermissions()
  const { email, name, id, phone } = useLocalSearchParams<
    SignUp & { id: string; phone: string }
  >()
  const [postMediaObject] = useUploadImageMutation()

  const [editUserData] = useEditUserDataMutation()

  const { control, handleSubmit } = useForm<Profile>({
    defaultValues: { ...DEFAULT_VALUES, email, name, phone },
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
        console.log(res, "EDIT USER DATA")

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

  return {
    ref,
    image,
    control,
    handleSubmit,
    handleOpeBottom,
    getImageInGalery,
    handleCreateAccount
  }
}
