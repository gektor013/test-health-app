import { KeyboardAvoidingView, ScreenContainer } from "@/shared/components"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"

export default function SignUpLayout() {
  // const { isAuthenticated } = useAuth()

  // if (isAuthenticated) return <Redirect href={"/tabs"} />

  return (
    <ScreenContainer style={styles.screenContainer}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerShown: false
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 0
  },
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
