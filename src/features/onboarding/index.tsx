import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "@/shared/components";
import { Control, TextCarousel } from "./components";
import { colors } from "@/constants";
import { slides } from "./util";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export const Onboarding = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      handleSkip();
    }
  };

  const handleSkip = () => {
    router.push("/auth/sign-in");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.headerText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image source={slide.image} style={styles.image} />
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.bottomSheet}>
        <TextCarousel slides={slides} scrollX={scrollX} />
        <Control
          slides={slides}
          width={width}
          scrollX={scrollX}
          handleNext={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 16,
  },
  headerText: {
    color: colors.white,
  },
  imageContainer: {
    width,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    position: "absolute",
    top: -32,
    width,
  },
  image: {
    resizeMode: "contain",
    width: undefined,
    height: undefined,
    aspectRatio: 0.5,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    bottom: 0,
    paddingVertical: 32,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
