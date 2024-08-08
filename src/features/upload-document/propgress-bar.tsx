// CustomProgressBar.js
import { colors } from "@/constants"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

const CustomProgressBar = ({ progress }: { progress: number }) => {
  const progressValue = useSharedValue(progress)

  // Update progress value with animation
  React.useEffect(() => {
    progressValue.value = withSpring(progress, { stiffness: 100 })
  }, [progress])

  // Animated style for progress bar fill
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <Animated.View style={[styles.barFill, animatedStyle]} />
      </View>
      <Text style={styles.text}>{`${Math.round(progress)}%`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  barBackground: {
    // width: "100%",
    maxWidth: 260,
    flex: 1,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 20,
    overflow: "hidden"
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.green,
    borderRadius: 20
  },
  text: {
    // marginTop: 5,
    fontSize: 11,
    color: "#333"
  }
})

export default CustomProgressBar
