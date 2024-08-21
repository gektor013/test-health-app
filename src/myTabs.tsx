/* eslint-disable react-native/no-inline-styles */
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import React from "react"
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { useAnimatedStyle, withSpring } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import BottomTabIcon from "./BottomTabIcon"
import { colors } from "./constants"

export const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  // I'm using the inset from react-native-safe-area-context as the bottom value.
  // If you're not using react-native-safe-area-context, you can change it according to your needs.
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const MARGIN = 20
  const TAB_BAR_WIDTH = width - 2 * MARGIN
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(TAB_WIDTH * state.index) }]
    }
  })

  return (
    <View
      style={[
        styles.tabBarContainer,
        { width, bottom: insets.bottom, marginHorizontal: -16 }
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          console.log("onPress", route.name)

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, { merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          })
        }

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={styles.contentContainer}>
              <BottomTabIcon route={route.name} isFocused={isFocused} />
              <Text
                style={{
                  color: isFocused ? colors.green : colors.gray,
                  fontSize: 12
                }}
              >
                {descriptors[route.key].options.title ?? "Home"}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
    height: 65,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.light_gray,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  slidingTab: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "white"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  }
})
