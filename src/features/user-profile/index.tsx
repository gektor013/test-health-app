import React, { useRef } from "react"
import { useForm } from "react-hook-form"

import { useAppSelector } from "@/redux"
import { profileSchema } from "@/schemas/profile/profile.schema"
import { Button, UserProfileForm } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useGetCameraPermissions } from "@/shared/hooks"
import { Profile } from "@/types/profile"
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { View } from "react-native"

const DEFAULT_VALUES: Profile = {
  birthdate: "",
  email: "",
  sex: "",
  name: "",
  phone: ""
}

export const UserProfile = () => {
  const ref = useRef<BottomSheet>(null)
  const user = useAppSelector((s) => s.auth.user)
  const { getImageInGalery, image } = useGetCameraPermissions()

  const { control, handleSubmit } = useForm<Profile>({
    defaultValues: { ...DEFAULT_VALUES },
    resolver: zodResolver(profileSchema)
  })

  const handleOpeBottom = async () => {
    ref.current?.snapToPosition("25%")
  }

  return (
    <>
      <UserProfileForm
        onImagePress={handleOpeBottom}
        image={user?.image as string}
        control={control}
        scrollEnabled={false}
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
