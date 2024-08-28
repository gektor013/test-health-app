import { ScreenContainer } from "@/shared/components"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"

export default function UploadDocumentLayout() {
  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
            title: "Upload document"
          }}
        />
      </View>
      {/* </TouchableWithoutFeedback> */}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
