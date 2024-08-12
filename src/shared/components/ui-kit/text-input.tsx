import { useState } from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import {
  Pressable,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  TextProps,
  View
} from "react-native"
import MaskInput from "react-native-mask-input"

import { colors } from "@/constants"
import { SVGIconNames } from "@/types/icons"

import { FormError } from "./form-error"
import { SVGIcon } from "./svg-icon"
import { Text } from "./text"

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  inputProps?: TextInputProps
  label: string
  labelStyle?: TextProps["style"]
  type?: "text" | "password" | "phone"
  lockIconOffset?: number
  iconName?: SVGIconNames
}

const phoneNumberMask = [
  "+",
  "4",
  "8",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/
]

const getBorderColor = (isSubmitted: boolean, hasError: boolean) => {
  if (isSubmitted && !hasError) {
    return colors.green
  } else if (hasError) {
    return colors.red
  } else {
    return colors.light_gray
  }
}

export const TextInput = <T extends FieldValues>({
  name,
  label,
  control,
  iconName,
  inputProps,
  labelStyle,
  type = "text",
  lockIconOffset
}: Props<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, isDirty }
        }) => (
          <View style={styles.container}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <View>
              {type === "phone" ? (
                <MaskInput
                  {...inputProps}
                  value={value}
                  onChangeText={(masked) => onChange(masked.replace(/[ +]/g, ""))}
                  style={[
                    styles.input,
                    inputProps?.style,
                    { borderColor: getBorderColor(isDirty, !!error) }
                  ]}
                  placeholderTextColor={colors.dark_gray}
                  onBlur={onBlur}
                  mask={phoneNumberMask}
                />
              ) : (
                <RNTextInput
                  {...inputProps}
                  secureTextEntry={type === "password" && !isPasswordVisible}
                  style={[
                    styles.input,
                    { borderColor: getBorderColor(isDirty, !!error) },
                    inputProps?.style
                  ]}
                  placeholderTextColor={colors.dark_gray}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              {type === "password" && (
                <Pressable
                  style={[
                    styles.lockIcon,
                    {
                      right: lockIconOffset ?? styles.input.paddingHorizontal
                    }
                  ]}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <SVGIcon
                    name={isPasswordVisible ? "eye_show" : "eye_off"}
                    size={16}
                    color={colors.dark_gray}
                  />
                </Pressable>
              )}
              <View
                style={[
                  styles.lockIcon,
                  {
                    right: lockIconOffset ?? styles.input.paddingHorizontal
                  }
                ]}
              >
                {iconName && (
                  <SVGIcon name={iconName} size={16} color={colors.dark_gray} />
                )}
              </View>
            </View>
            <FormError error={error} />
          </View>
        )}
        name={name}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black
  },
  input: {
    backgroundColor: colors.light_gray,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: 12
  },
  lockIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center"
  },
  searchContainer: {
    backgroundColor: colors.gray,
    gap: 24,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  searchText: {
    fontSize: 16
  },
  error: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  errorText: {
    color: colors.red
  }
})
