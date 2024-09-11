import { appTheme } from "@/constants"
import store, { persistor, useAppSelector } from "@/redux"
import { useGetFreeEmployeesQuery } from "@/redux/services/employee-api"
import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { useGetMeQuery } from "@/redux/services/user-api"
import { useGetPrivateVisitsQuery } from "@/redux/services/visit-api"
import { useCheckInternet } from "@/shared/hooks"
import { dateHelper } from "@/utils/helpers/date"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ThemeProvider } from "@react-navigation/native"
import { SplashScreen, Stack } from "expo-router"
import * as SystemUI from "expo-system-ui"
import { useEffect } from "react"
import { StyleSheet, Text } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Host } from "react-native-portalize"
import "react-native-reanimated"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

export const unstable_settings = {
  initialRouteName: "index"
}
SplashScreen.preventAutoHideAsync()
SystemUI.setBackgroundColorAsync("white")

export default function RootLayout() {
  useCheckInternet()

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider value={appTheme}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Host>
                  <MainStack />
                </Host>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

const MainStack = () => {
  const { isAuthenticated } = useAppSelector((s) => s.auth)

  const { isLoading: isLoadingMe } = useGetMeQuery(null, {
    skip: !isAuthenticated
  })
  const { isLoading: isLoadingEmployee } = useGetFreeEmployeesQuery(
    {
      day: dateHelper.formatedData(new Date(), "YYYY-MM-DD"),
      page: 1,
      limit: 1
    },
    { skip: !isAuthenticated }
  )
  const { isLoading: isLoadingService } = useGetAllServicesQuery(null, {
    skip: !isAuthenticated
  })
  const { isLoading: isLoadingVisit } = useGetPrivateVisitsQuery(
    {
      status: "Pending",
      page: 1,
      limit: 3
    },
    { skip: !isAuthenticated }
  )

  useEffect(() => {
    if (isLoadingEmployee || isLoadingService || isLoadingVisit || isLoadingMe) return

    SplashScreen.hideAsync()
  }, [isLoadingEmployee, isLoadingService, isLoadingVisit, isLoadingMe])

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="upload-document"
          options={{
            headerShown: true,
            title: "Upload Documents",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="password-manager"
          options={{
            headerShown: true,
            title: "Password manager",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            title: "Settings",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="user-profile"
          options={{
            headerShown: true,
            title: "Your profile",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="notifications"
          options={{
            headerShown: true,
            title: "Notification",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="therapist-list"
          options={{
            headerShown: true,
            title: "List therapists",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="therapist-details"
          options={{
            headerShown: true,
            title: "List therapists",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="faq"
          options={{
            headerShown: true,
            title: "FAQ’s",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
          }}
        />

        <Stack.Screen
          name="details-appointment"
          options={{
            headerShown: true,
            title: "Details appointments",
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: "400" }
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

        <Stack.Screen
          name="auth/sign-up"
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Sign up",
            headerTitleStyle: styles.headerTitle,
            headerShadowVisible: false
          }}
        />

        <Stack.Screen
          name="auth/complete-profile"
          options={{
            headerBackTitleVisible: false,
            headerTitle: "Complete Your Profile",
            headerTitleStyle: styles.headerTitle,
            headerShadowVisible: false
          }}
        />

        <Stack.Screen
          name="(app)/tabs"
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="no-connection"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>
      <Text
        style={{
          position: "absolute",
          bottom: 15,
          left: 15
        }}
      >
        Project version: 1.0.18
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 17,
    fontWeight: "400",
    borderWidth: 4
  }
})
