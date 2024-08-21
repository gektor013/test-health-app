import { Alert, Linking } from "react-native"
import React from "react"
import * as ImagePicker from "expo-image-picker"

interface ReturnData {
  image: ImagePicker.ImagePickerAsset | null
  getImageInGalery: (status: "camera" | "gallery") => Promise<void>
}

export const useCreateProfile = (): ReturnData => {
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(null)

  // GET PERISSIONS FOR CAMERA AND GALLERY
  const getPermissions = async (type: "camera" | "gallery"): Promise<boolean> => {
    if (type === "gallery") {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!galleryStatus.granted) {
        Alert.alert(
          "Permission required",
          "The app requires access to the camera and gallery to upload images."
        )

        return false
      }

      return true
    } else {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()

      if (!cameraStatus.granted) {
        Alert.alert(
          "Permission required",
          "The app needs camera access to upload images."
        )
        return false
      }

      return true
    }
  }

  const getImageInGalery = async (status: "camera" | "gallery") => {
    try {
      const galleryStatus = await getPermissions(status)
      let result
      if (!galleryStatus) {
        return Linking.openSettings()
      }

      if (status === "gallery") {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
          selectionLimit: 1
        })
      } else {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8
        })
      }

      if (result && !result?.canceled) {
        const image = result?.assets[0]
        setImage(image)
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting the image.")
    }
  }

  return {
    image,
    getImageInGalery
  }
}
