import { ScreenContainer } from "@/shared/components"
import { StatusBar } from "expo-status-bar"
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"

export default function UserProfileLayout() {
  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container} />
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
