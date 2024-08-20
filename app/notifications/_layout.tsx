import { ScreenContainer } from "@/shared/components"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"

export default function NotificationsLayout() {
  return (
    <ScreenContainer style={{ margin: -16 }}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
