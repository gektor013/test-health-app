import { View } from "react-native"
import React from "react"

import { Button, UserProfileForm } from "@/shared/components"
import CustomBottomSheet from "@/shared/components/bottomSheet/bottomSheet"

import { useUpdateUserProfile } from "./_hooks/useUpdateUserProfile"

export const UserProfile = () => {
  const {
    ref,
    image,
    control,
    userData,
    isLoading,
    handleSubmit,
    handleOpeBottom,
    getImageInGalery,
    handleEditProfile
  } = useUpdateUserProfile()

  return (
    <React.Fragment>
      <UserProfileForm
        onImagePress={handleOpeBottom}
        image={image ? image : (userData?.image as string)}
        control={control}
        scrollEnabled={false}
        handlePress={{
          cb: handleSubmit(handleEditProfile),
          disabled: isLoading
        }}
      />
      <CustomBottomSheet ref={ref}>
        <View style={{ gap: 16 }}>
          <Button onPress={() => getImageInGalery("camera")} title="Camera" />
          <Button onPress={() => getImageInGalery("gallery")} title="Gallery" />
        </View>
      </CustomBottomSheet>
    </React.Fragment>
  )
}
