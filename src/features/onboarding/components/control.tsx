import { Animated, StyleSheet, View } from "react-native"
import React from "react"

import { colors } from "@/constants"
import { Button } from "@/shared/components"

import { OnboardingSlide } from "../types"

interface Props {
  slides: OnboardingSlide[]
  width: number
  scrollX: Animated.Value
  handleNext: () => void
}

export const Control: React.FC<Props> = ({ slides, width, scrollX, handleNext }) => {
  return (
    <View style={styles.container}>
      {slides.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [16, 32, 16],
          extrapolate: "clamp"
        })
        const dotHeight = scrollX.interpolate({
          inputRange,
          outputRange: [8, 8, 8],
          extrapolate: "clamp"
        })
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.white, colors.green, colors.white],
          extrapolate: "clamp"
        })
        const borderColor = scrollX.interpolate({
          inputRange,
          outputRange: [colors.gray, colors.green, colors.gray],
          extrapolate: "clamp"
        })
        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width: dotWidth,
                height: dotHeight,
                backgroundColor,
                borderColor
              }
            ]}
          />
        )
      })}
      <View style={styles.buttonContainer}>
        <Button variant="round" onPress={handleNext} title="Get Started" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  dot: {
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.green,
    marginHorizontal: 4
  },
  buttonContainer: {
    position: "absolute",
    top: 0,
    right: 16,
    bottom: 0
  }
})
