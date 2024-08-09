import { Pressable, StyleSheet, Text, View } from "react-native"
import DocumentPicker, {
  DocumentPickerResponse,
  types
} from "react-native-document-picker"
import React, { useCallback, useState } from "react"

import { colors } from "@/constants"
import { useAppSelector } from "@/redux"
import { usePostMediaObjectMutation } from "@/redux/services"
import { Button, SVGIcon } from "@/shared/components"

import CustomProgressBar from "./propgress-bar"

const formatedSize = (size: number) => {
  if (size >= 1000 * 1000) {
    return `${(size / 1000 / 1000).toFixed(2)}MB`
  } else if (size >= 1000) {
    return `${(size / 1000).toFixed(2)}KB`
  } else {
    return `${size}B`
  }
}

export const UploadDocument = () => {
  const [files, setFiles] = React.useState<DocumentPickerResponse[]>([])
  const [uploadServerFiles, setUploadServerFiles] = useState<Record<string, string>[]>([])
  const [postMediaObject] = usePostMediaObjectMutation()
  const { file: uploadFile } = useAppSelector((state) => state.media)

  const pickDocument = useCallback(async () => {
    try {
      const mediaResult = await DocumentPicker.pick({
        type: [types.allFiles]
      })

      if (mediaResult) {
        setFiles((prev) => [...prev, ...mediaResult])
        const finded = files.find((f) => f.uri === mediaResult[0].uri)

        try {
          const upload = await postMediaObject(mediaResult[0].uri).unwrap()

          if (upload.status === 201) {
            const { contentUrl } = JSON.parse(upload.body)
            setUploadServerFiles((prev) => [
              ...prev,
              { contentUrl, uri: mediaResult[0].uri }
            ])
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker")
      } else {
        console.error("Unknown Error: ", err)
      }
    }
  }, [files])

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <View style={styles.root}>
      {files.length > 0 ? (
        files.map((file, i) => (
          <View key={`${file.uri} ${i}`} style={styles.container}>
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.content}>
                  <SVGIcon name="pdf" size={32} />
                  <View style={styles.text}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                      {file.name}
                    </Text>
                    <Text>{formatedSize(file.size!)}</Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => removeFile(i)}
                  disabled={uploadFile.uri === file.uri}
                >
                  {uploadServerFiles[i]?.uri === file.uri ? (
                    <SVGIcon name="check" size={15} />
                  ) : (
                    <SVGIcon name="trash" size={15} />
                  )}
                </Pressable>
              </View>
            </View>
            {uploadFile.uri === file.uri && (
              <View style={{ width: "100%" }}>
                <CustomProgressBar progress={uploadFile.uploadStatus} />
              </View>
            )}
          </View>
        ))
      ) : (
        <View style={styles.noFileTitle}>
          <Text>You have no documents uploaded</Text>
        </View>
      )}

      <Button
        title="Upload documents"
        variant="outline"
        icon="upload"
        onPress={pickDocument}
        containerStyles={{ backgroundColor: "#F2FDFC" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16
  },
  container: {
    backgroundColor: colors.light_gray,
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  text: {
    gap: 4,
    width: "80%"
  },
  title: {
    fontWeight: "600"
  },
  noFileTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32
  }
})
