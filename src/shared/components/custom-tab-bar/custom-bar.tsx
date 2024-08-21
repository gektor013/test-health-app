import React from "react"
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types"

import { colors } from "@/constants"
import { SVGIcon } from "../ui-kit/svg-icon"

import BottomTabIcon from "./bottom-tab-icon"

const CentralTabButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable style={styles.centralButton} onPress={onPress}>
    <View style={styles.centralIconContainer}>
      <SVGIcon name="calendar_plus" color="white" />
    </View>
  </Pressable>
)

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const currentRoute = state.routes[state.index].name

  console.log()

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          width,
          bottom: Platform.OS === "ios" ? 0 : insets.bottom,
          marginHorizontal: -16,
          display: currentRoute === "appointement-create" ? "none" : "flex"
        }
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          })
        }

        if (route.name === "appointement-create") {
          return <CentralTabButton key={route.name} onPress={onPress} />
        }

        return (
          <Pressable
            key={route.name}
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
    justifyContent: "space-around"
    // overflow: "hidden"
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
  },

  centralButton: {
    top: -23,
    justifyContent: "center",
    alignItems: "center"
  },
  centralIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center"
  }
})
