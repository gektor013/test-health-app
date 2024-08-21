import { Platform, SafeAreaView, StyleSheet, View, ViewProps } from "react-native"
import { SafeAreaView as RNSSafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"

import { colors } from "@/constants"

export const ScreenContainer: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container, style]} {...restProps} />
    </SafeAreaView>
  )
}

export const ScreenGradientContainer: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return (
    <>
      <LinearGradient
        style={styles.flex1}
        colors={[colors.green, colors.light_green]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <RNSSafeAreaView edges={["top", "left", "right"]} style={styles.flex1}>
          <View style={[styles.container, style]} {...restProps} />
        </RNSSafeAreaView>
      </LinearGradient>
      <RNSSafeAreaView
        edges={["bottom", "left", "right"]}
        style={{ backgroundColor: colors.white }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0
  },
  container: {
    overflow: "visible",
    flex: 1,
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16
  }
})
