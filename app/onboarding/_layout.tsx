import { Stack } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScreenGradientContainer } from "@/shared/components";
import { StatusBar } from "expo-status-bar";

export default function OnboardingLayout() {
  return (
    <ScreenGradientContainer style={styles.screenContainer}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenGradientContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
