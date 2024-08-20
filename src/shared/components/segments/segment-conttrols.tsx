import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import React from "react"

import { colors } from "@/constants"

type SegmentedControlProps = {
  options: string[]
  selectedOption: number
  onOptionPress?: (index: number) => void
}

export const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { width: windowWidth } = useWindowDimensions()

    const internalPadding = 10
    const segmentedControlWidth = windowWidth - 40

    const itemWidth = (segmentedControlWidth - internalPadding) / options.length

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(itemWidth * selectedOption + internalPadding / 2)
      }
    }, [selectedOption, options, itemWidth])

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            paddingLeft: internalPadding / 2
          }
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth
            },
            rStyle,
            styles.activeBox
          ]}
        />
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(index)
              }}
              key={option}
              style={[
                {
                  width: itemWidth
                },
                styles.labelContainer
              ]}
            >
              <Text
                style={[
                  styles.label,
                  {
                    color:
                      option === options[selectedOption] ? colors.white : colors.dark_gray
                  }
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 37,
    borderRadius: 12,
    backgroundColor: colors.light_gray
  },
  activeBox: {
    position: "absolute",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: "80%",
    top: "10%",
    backgroundColor: colors.green
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    color: colors.dark_gray,
    fontSize: 14
  }
})
