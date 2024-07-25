import { ImageBackground, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageBackground from "#/images/background.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants";

export const ScreenContainer: React.FC<ViewProps> = ({
  style,
  ...restProps
}) => {
  return (
    <SafeAreaView style={styles.flexContainer}>
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
    <LinearGradient
      style={styles.imageContainer}
      colors={[colors.green, colors.light_green]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={[styles.flexContainer]}>
        <View style={[styles.container, , style]} {...restProps} />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});
