import { Stack } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAvoidingView, ScreenContainer } from "@/shared/components";
import { StatusBar } from "expo-status-bar";

export default function SignInLayout() {
  return (
    <ScreenContainer style={styles.screenContainer}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
