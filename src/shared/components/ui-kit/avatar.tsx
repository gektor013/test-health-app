import { StyleSheet, View } from "react-native"
import React from "react"

import { colors } from "@/constants"

interface Props {
  name?: string
  size?: number
}

export const Avatar: React.FC<Props> = ({ size = 30 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size }]} />
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: colors.gray
  }
})
