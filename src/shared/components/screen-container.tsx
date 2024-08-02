import { colors } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ScreenContainer: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container, style]} {...restProps} />
    </SafeAreaView>
  );
};

export const ScreenGradientContainer: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return (
    <>
      <LinearGradient
        style={styles.flex1}
        colors={[colors.green, colors.light_green]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={["top", "left", "right"]} style={styles.flex1}>
          <View style={[styles.container, style]} {...restProps} />
        </SafeAreaView>
      </LinearGradient>
      <SafeAreaView edges={["bottom", "left", "right"]} style={{ backgroundColor: colors.white }} />
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    overflow: "visible",
    flex: 1,
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});
