import React from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { useTranslations } from "@/shared/hooks";
import { OnboardingSlide } from "../types";
import { colors } from "@/constants";

const { width } = Dimensions.get("window");

interface Props {
  slides: OnboardingSlide[];
  scrollX: Animated.Value;
}

export const TextCarousel: React.FC<Props> = ({ slides, scrollX }) => {
  const translateX = scrollX.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((_, i) => -i * width),
    extrapolate: "clamp",
  });

  const { t } = useTranslations();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.carousel, { transform: [{ translateX }] }]}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.contentContainer}>
            <Text style={styles.title}>{t(slide.title)}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    overflow: "hidden",
  },
  carousel: {
    flexDirection: "row",
    width: width * 3,
  },
  contentContainer: {
    width,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark_green,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
  },
});
