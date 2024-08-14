import { Button, Dimensions, Text, View } from "react-native"
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import React, { useEffect, useState } from "react"

import { useFocusEffect } from "@react-navigation/native"

const { width } = Dimensions.get("window")

const slides = [
  { id: 1, text: "Slide 1" },
  { id: 2, text: "Slide 2" },
  { id: 3, text: "Slide 3" }
]

export const Profile = () => {
  const currentIndex = useSharedValue(0)
  const [index, setIndex] = useState(0)

  useAnimatedReaction(
    () => currentIndex.value,
    (newIndex) => {
      runOnJS(setIndex)(newIndex)
    }
  )

  const derivedIndex = useDerivedValue(() => {
    return currentIndex.value
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(-currentIndex.value * width) }]
    }
  })

  const handleNext = () => {
    if (currentIndex.value < slides.length - 1) {
      currentIndex.value += 1
    }
  }

  useEffect(() => {
    return () => console.log("Unmounting")
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      console.log("Mounting")

      return () => {
        setIndex(0)

        // Do something that should run on blur
      }
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            width: width * slides.length,
            justifyContent: "flex-start",
            backgroundColor: "red"
          },
          animatedStyle
        ]}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={{
              width,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "green"
            }}
          >
            <Text style={{ fontSize: 24, backgroundColor: "red", textAlign: "center" }}>
              {slide.text} {index}
            </Text>
          </View>
        ))}
      </Animated.View>
      <Button title="Next" onPress={handleNext} />
      <View style={{ position: "absolute", bottom: 50, left: 20 }}>
        <Animated.Text style={{ fontSize: 20 }}>
          {`Current Index: ${index}`}
        </Animated.Text>
      </View>
    </View>
  )
}
