import { colors } from "@/constants"
import { Button, SVGIcon } from "@/shared/components"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

export const UploadDocument = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.content}>
          <SVGIcon name="pdf" size={32} />
          <View style={styles.text}>
            <Text style={styles.title}>document№1.pdf</Text>
            <Text>123 MB</Text>
          </View>
        </View>
        <SVGIcon name="trash" size={15} />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <SVGIcon name="pdf" size={32} />
          <View style={styles.text}>
            <Text style={styles.title}>document№1.pdf</Text>
            <Text>123 MB</Text>
          </View>
        </View>
        <SVGIcon name="trash" size={15} />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <SVGIcon name="pdf" size={32} />
          <View style={styles.text}>
            <Text style={styles.title}>document№1.pdf</Text>
            <Text>123 MB</Text>
          </View>
        </View>
        <SVGIcon name="trash" size={15} />
      </View>

      <Button
        title="Upload documents"
        variant="outline"
        icon="upload"
        containerStyles={{ backgroundColor: "#F2FDFC" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16
    // backgroundColor: "red"
  },
  container: {
    backgroundColor: colors.light_gray,
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  text: {
    gap: 4
  },
  title: {
    fontWeight: "600"
  }
})
