import { Stack } from "expo-router";
import { useEffect } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "@/redux";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { appTheme } from "@/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "welcome",
};

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider value={appTheme}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack>
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="auth/sign-in"
                  options={{
                    headerBackTitleVisible: false,
                    headerTitle: "Sign in",
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                  }}
                />
                {/* <Stack.Screen name="(app)" options={{ headerShown: false }} /> */}
                <Stack.Screen name="+not-found" />
              </Stack>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 17,
    fontWeight: "400",
    borderWidth: 4,
  },
});
