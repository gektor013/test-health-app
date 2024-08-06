import { colors } from "@/constants"
import { VectorExpoIcons } from "@/shared/components"
import React from "react"
import { Pressable, StyleSheet, View } from "react-native"

interface CheckBoxProps {
  isChecked: boolean
  variant?: "square" | "round"
  disabled?: boolean
  onPress: () => void
}

export const CheckBox = ({
  isChecked,
  onPress,
  disabled,
  variant = "round"
}: CheckBoxProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          borderRadius: variant === "square" ? 4 : 10,
          borderColor:
            variant === "square" && isChecked && !disabled
              ? colors.green
              : disabled
              ? colors.disabled
              : colors.gray
        }
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <View
        style={[
          styles.checkItem,
          variant === "square" ? styles.squareCheckItem : {},
          {
            backgroundColor:
              isChecked && !disabled
                ? colors.green
                : disabled
                ? isChecked
                  ? colors.disabled
                  : colors.white
                : colors.white
          }
        ]}
      >
        {variant === "square" && isChecked && (
          <VectorExpoIcons type="AntDesign" name="check" color={colors.white} size={18} />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: 20,
    aspectRatio: 1,
    borderColor: colors.gray
  },
  checkItem: {
    width: 11,
    height: 11,
    borderRadius: 6,
    alignItems: "center"
  },
  squareCheckItem: {
    width: 18,
    height: 18,
    borderRadius: 3
  }
})
