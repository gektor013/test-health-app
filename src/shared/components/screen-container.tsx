import { ImageBackground, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageBackground from "#/images/background.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants";
import { Fragment } from "react";
import { Text } from "./ui-kit";

export const ScreenContainer: React.FC<ViewProps> = ({
  style,
  ...restProps
}) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container, style]} {...restProps} />
    </SafeAreaView>
  );
};

// export const ScreenBackgroundContainer: React.FC<ViewProps> = ({
//   style,

//   ...restProps
// }) => {
//   return (
//     <ImageBackground source={imageBackground} style={styles.imageContainer}>
//       <SafeAreaView style={styles.flexContainer}>
//         <View style={[styles.container, style]} {...restProps} />
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

export const ScreenGradientContainer: React.FC<ViewProps> = ({
  style,
  ...restProps
}) => {
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
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={{ backgroundColor: colors.white }}
      />
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
