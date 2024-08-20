import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"

export const UploadedDocuments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded documents</Text>
      <View style={styles.fileContainer}>
        <SVGIcon name="pdf" size={27} style={styles.icon} />
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>document№1.pdf</Text>
          <Text style={styles.fileSize}>123 MB</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    padding: 16,
    gap: 16,
    borderRadius: 10
  },
  title: {
    fontWeight: "600",
    lineHeight: 17
  },
  fileContainer: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: colors.light_gray,
    borderRadius: 12,
    gap: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 8
  },
  fileInfo: {
    justifyContent: "center"
  },
  fileName: {
    fontWeight: "600"
  },
  fileSize: {
    color: colors.dark_gray
  }
})
