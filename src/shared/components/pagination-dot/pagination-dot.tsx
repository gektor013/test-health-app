import { StyleSheet } from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle
} from "react-native-reanimated"
import React from "react"

import { colors } from "@/constants"
import { commonHelpers } from "@/utils/helpers/common"

type Props = {
  index: number
  x: SharedValue<number>
}

const SCREEN_WIDTH = commonHelpers.getDimensionsParams().width

export const PaginationDot = ({ index, x }: Props) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [16, 32, 16],
      Extrapolation.CLAMP
    )

    const backgroundColor = interpolateColor(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [colors.white, colors.green, colors.white]
    )

    const borderColor = interpolateColor(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [colors.gray, colors.green, colors.gray]
    )

    return {
      width: widthAnimation,
      backgroundColor,
      borderColor
    }
  })

  return <Animated.View style={[styles.dots, animatedDotStyle]} />
}

const styles = StyleSheet.create({
  dots: {
    height: 8,
    width: 16,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1
  }
})
