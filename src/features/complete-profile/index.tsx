import React from "react"
import { Text, View } from "react-native"

import { Button, UserProfileForm } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"
import { useCreateProfile } from "./hooks/useCreateProfile"

export const CompleteProfile = () => {
  const {
    getImageInGalery,
    ref,
    image,
    control,
    handleOpeBottom,
    handleSubmit,
    handleCreateAccount
  } = useCreateProfile()

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
