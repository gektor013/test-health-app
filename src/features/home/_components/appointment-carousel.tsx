import { useRef, useState } from "react"
import { Animated, Dimensions, ScrollView, StyleSheet, View } from "react-native"

const { width } = Dimensions.get("window")

export const AppointmentCarousel = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false
        })}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
      >
        {/* {slides.map((slide, index) => (
          <View key={index} style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image source={slide.image} style={styles.image} />
            </View>
          </View>
        ))} */}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})
