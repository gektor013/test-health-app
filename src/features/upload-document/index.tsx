import { useLocalSearchParams } from "expo-router"
import React, { useCallback, useEffect, useState } from "react"
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import DocumentPicker, {
  DocumentPickerResponse,
  types
} from "react-native-document-picker"

import { colors } from "@/constants"
import { useAppSelector } from "@/redux"
import { usePostMediaObjectMutation } from "@/redux/services"
import { Button, SVGIcon } from "@/shared/components"
import { useActions } from "@/shared/hooks"

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

interface Documents {
  contentUrl: string
  id: number
}

export const UploadDocument = () => {
  const { setUploadCountFiles } = useActions()
  const [uploadDocuments, setUploadDocuments] = useState<Documents[] | null>([])
  const [files, setFiles] = useState<DocumentPickerResponse[]>([])
  const [uploadServerFiles, setUploadServerFiles] = useState<Record<string, string>[]>([])

  const { file: uploadFile, uploadCountFiles } = useAppSelector((state) => state.media)

  const { data, isUploadDocument } = useLocalSearchParams<{
    data: any
    isUploadDocument: "1" | "0" // 0 - false, 1 - true its need for appointment-create
  }>()
  const documents = data ? (JSON.parse(data) as Documents[]) : [] // PARSE DOCUMENTS WHEN WE WENT FROM PROFILE PAGE

  const [postMediaObject] = usePostMediaObjectMutation()

  const pickDocument = useCallback(async () => {
    try {
      const mediaResult = await DocumentPicker.pick({
        type: [types.allFiles]
      })

      if (mediaResult) {
        setFiles((prev) => [...prev, ...mediaResult])

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
          Alert.alert("Upload Media Error", "Please try again")
          console.log(error, "Upload Media Error")
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

  useEffect(() => {
    // UPLOAD DOCUMENT PAGE, WE SHOW UPLOADS DOCUMENTS
    if (documents?.length > 0) {
      setUploadDocuments(documents)
    }
  }, [documents?.length])

  useEffect(() => {
    // ITS NEED FOR APPOINTMENT-CREATE COUNT UPLOAD
    if (uploadServerFiles.length > 0 && Number(isUploadDocument)) {
      setUploadCountFiles(uploadCountFiles + 1)
    }
  }, [uploadServerFiles.length])

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.root}
    >
      {uploadDocuments?.map((document) => (
        <Pressable key={document.id} style={styles.container}>
          <View>
            <View style={styles.fileContainer}>
              <View style={styles.content}>
                <SVGIcon name="pdf" size={32} />
                <View style={styles.text}>
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {document.contentUrl}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      ))}

      {files?.map((file, i) => (
        <View key={`${file.uri} ${i}`} style={styles.container}>
          <View>
            <View style={styles.fileContainer}>
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
      ))}

      {!files.length && !uploadDocuments?.length && (
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: 16,
    width: "100%"
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
  fileContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
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
