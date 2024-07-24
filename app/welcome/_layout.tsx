import { Redirect, Stack } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScreenContainer } from "@/shared/components";
import { useAuth } from "@/shared/hooks";
import { StatusBar } from "expo-status-bar";

export default function WelcomeLayout() {
  // const { isAuthenticated } = useAuth();

  // if (isAuthenticated) {
  //   return <Redirect href="/(app)" />;
  // }

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
