import { ScreenContainer } from "@/shared/components"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native"

export default function NoConnectionLayout() {
  return (
    <ScreenContainer style={{ marginTop: Platform.OS === "ios" ? -16 : 0 }}>
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
