import { ScreenContainer } from "@/shared/components"
import { useAuth } from "@/shared/hooks"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"

export default function WelcomeLayout() {
  const { isAuthenticated, user } = useAuth()

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
