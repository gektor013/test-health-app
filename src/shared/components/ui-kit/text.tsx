import { StyleSheet, Text as BaseText, type TextProps } from "react-native"
import React from "react"

import { colors } from "@/constants"

interface Props extends TextProps {
  type?: "text" | "link"
}

export const Text: React.FC<Props> = ({ type = "text", style, ...rest }) => {
  return (
    <BaseText
      style={[
        styles.text,
        { color: type === "link" ? colors.green : colors.black },
        style
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400"
  }
})
