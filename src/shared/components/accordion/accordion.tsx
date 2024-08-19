import React from "react"

import { colors } from "@/constants"
import { Category } from "@/utils/default-datas/faq"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { SVGIcon } from "../ui-kit"

type Props = {
  value: Category
}

export const Accordion = ({ value }: Props) => {
  const listRef = useAnimatedRef()
  const heightValue = useSharedValue(0)
  const open = useSharedValue(false)
  const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)))

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value
  }))

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }]
  }))

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              "worklet"
              heightValue.value = withTiming(measure(listRef)!.height)
            })()
          } else {
            heightValue.value = withTiming(0)
          }
          open.value = !open.value
        }}
        style={styles.titleContainer}
      >
        <Text style={styles.textTitle}>{value.title}</Text>
        <Animated.View style={iconStyle}>
          <SVGIcon name="arrow_down" size={14} />
        </Animated.View>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          {value.content.map((v, i) => {
            return (
              <View key={i} style={styles.content}>
                <Text style={styles.textContent}>{v}</Text>
              </View>
            )
          })}
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default Accordion

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.light_gray,
    overflow: "hidden"
  },
  textTitle: {
    maxWidth: "90%",
    color: colors.black,
    fontWeight: "600"
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  contentContainer: {
    position: "absolute",
    width: "100%",
    top: 0
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  textContent: {
    fontSize: 14,
    color: "black"
  }
})
