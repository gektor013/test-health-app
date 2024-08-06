import { StyleSheet, TextProps } from "react-native"
import React from "react"

import { Text } from "./text"

export const Title: React.FC<TextProps> = ({ children, style, ...rest }) => (
  <Text style={[styles.title, style]} {...rest}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center"
  }
})
