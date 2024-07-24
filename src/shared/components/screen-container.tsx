import { ImageBackground, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageBackground from "#/images/background.jpeg";

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
