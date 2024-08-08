import { appTheme } from "@/constants"
import store, { persistor } from "@/redux"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Host } from "react-native-portalize"
import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName: "index"
}

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 1000)
  }, [])

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider value={appTheme}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Host>
                  <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="welcome" options={{ headerShown: false }} />
                    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                    <Stack.Screen
                      name="upload-document"
                      options={{
                        headerShown: true,
                        title: "Upload Document",
                        headerBackTitleVisible: false
                      }}
                    />
                    <Stack.Screen
                      name="auth/sign-in"
                      options={{
                        headerBackTitleVisible: false,
                        headerTitle: "Sign in",
                        headerTitleStyle: styles.headerTitle,
                        headerShadowVisible: false
                      }}
                    />
                    <Stack.Screen name="(app)/tabs" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </Host>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 17,
    fontWeight: "400",
    borderWidth: 4
  }
})
