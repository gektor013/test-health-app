import { StyleSheet, View } from "react-native"
import { FieldError } from "react-hook-form"

import { colors } from "@/constants"

import { Text } from "./text"

interface Props {
  error: FieldError | undefined
}

export const FormError: React.FC<Props> = ({ error }) => {
  return error?.message ? (
    <View>
      <Text style={styles.text}>{error.message}</Text>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: colors.red
  }
})
