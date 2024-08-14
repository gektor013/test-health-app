import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes"
import { useState } from "react"
import { router } from "expo-router"

interface ReturnStepData {
  currentIndex: SharedValue<number>
  slideIndex: number
  animatedStyle: DefaultStyle
  stepsMethods: {
    handleSetSlideIndex: (index: number) => void
    onBackPress: () => void
  }
}

export const useSetStep = (width: number): ReturnStepData => {
  const currentIndex = useSharedValue(0)

  const [slideIndex, setSlideIndex] = useState(0)

  const handleSetSlideIndex = (index: number) => {
    currentIndex.value = index
    setSlideIndex(index)
  }

  const onBackPress = () => {
    currentIndex.value = 0
    setSlideIndex(0)
    router.back()
  }

  useAnimatedReaction(
    () => currentIndex.value,
    (newIndex) => {
      runOnJS(setSlideIndex)(newIndex)
    }
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(-currentIndex.value * width) }]
    }
  })

  return {
    currentIndex,
    slideIndex,
    animatedStyle,
    stepsMethods: {
      handleSetSlideIndex,
      onBackPress
    }
  }
}
