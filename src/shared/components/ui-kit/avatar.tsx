import React from "react"
import { Image, StyleSheet, View } from "react-native"

import { colors } from "@/constants"
import { API_URL } from "@/constants/enviroments"

interface Props {
  uri?: string
  size?: number
}

export const Avatar: React.FC<Props> = ({ size = 30, uri }) => {
  console.log(uri, "uri")

  return (
    <React.Fragment>
      {uri ? (
        <Image
          source={{ uri: API_URL + uri }}
          style={{ width: size, height: size, borderRadius: size }}
        />
      ) : (
        <View
          style={[styles.container, { width: size, height: size, borderRadius: size }]}
        />
      )}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: colors.gray
  }
})
