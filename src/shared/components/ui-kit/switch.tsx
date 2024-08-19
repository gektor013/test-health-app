import { Pressable, StyleSheet } from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { useCallback, useEffect } from "react"

interface IProps {
  handleOnPress: (flag: boolean) => void
  activeTrackColor: string
  inActiveTrackColor: string
  thumbColor: string
  value: boolean
}

export const Switch: React.FC<IProps> = ({
  handleOnPress,
  activeTrackColor,
  inActiveTrackColor,
  thumbColor,
  value
}) => {
  const switchTranslate = useSharedValue(0)

  useEffect(() => {
    switchTranslate.value = withSpring(value ? 12 : 0, {
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001
    })
  }, [value, switchTranslate])

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: switchTranslate.value }]
  }))

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      switchTranslate.value,
      [0, 12],
      [inActiveTrackColor, activeTrackColor]
    )
  }))

  const memoizedOnSwitchPressCallback = useCallback(() => {
    handleOnPress(!value)
  }, [handleOnPress, value])

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback}>
      <Animated.View style={[styless.containerStyle, animatedContainerStyle]}>
        <Animated.View
          style={[
            styless.circleStyle,
            { backgroundColor: thumbColor },
            animatedThumbStyle,
            styless.shadowValue
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}

const styless = StyleSheet.create({
  circleStyle: {
    width: 12,
    height: 12,
    borderRadius: 12
  },
  containerStyle: {
    width: 28,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 24
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  }
})
