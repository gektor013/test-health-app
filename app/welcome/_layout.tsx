import { Redirect, Stack } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScreenContainer } from "@/shared/components";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/shared/hooks";

export default function WelcomeLayout() {
  const { isAuthenticated, user } = useAuth();

  console.log(isAuthenticated, user);

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
