import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"
import React, { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"

interface Props {
  data: Record<string, string>[]
  label?: string
  plaseholder?: string
}
export const DropdownComponent = ({ data, label, plaseholder }: Props) => {
  const [value, setValue] = useState<string | null>(null)
  const [isFocus, setIsFocus] = useState(false)

  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isFocus ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [isFocus])

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  })

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      {label && <Text style={{ fontWeight: "600" }}>{label}</Text>}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.green }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={{
          overflow: "hidden",
          backgroundColor: colors.light_gray
        }}
        containerStyle={{
          borderRadius: 12,
          backgroundColor: colors.light_gray,
          overflow: "hidden"
        }}
        activeColor={colors.white_green}
        data={data}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? plaseholder : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value)
          setIsFocus(false)
        }}
        renderRightIcon={() => (
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <SVGIcon name={"arrow_down"} size={16} color={colors.dark_gray} />
          </Animated.View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8
  },
  dropdown: {
    height: 50,
    borderColor: colors.light_gray,
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.light_gray
  },
  icon: {
    marginRight: 5
  },

  placeholderStyle: {
    fontSize: 14,
    color: colors.dark_gray
  },
  selectedTextStyle: {},
  iconStyle: {
    width: 20,
    height: 20
  }
})
