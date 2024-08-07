import { Animated, ScrollView, StyleSheet, View } from "react-native"

import { colors } from "@/constants"
import { Button } from "@/shared/components"
import { useRef, useState } from "react"
// import { slides } from "../onboarding/util"
import { commonHelpers } from "@/utils/helpers/common"
import { router } from "expo-router"
import { CustomHeader } from "./components/header/header"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { styles } from "./styles"

// const width = commonHelpers.getDimensionsParams().width

const slides = [
  {
    id: 1,
    component: () => (
      <>
        <VisitsTypes />
        <TherapistList />
      </>
    )
  },
  {
    id: 2,
    component: () => <></>
  },
  {
    id: 3,
    component: () => <></>
  }
]

const width = commonHelpers.getDimensionsParams().width

export const AppointmentCreate = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1)
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true
      })
    }
  }

  const onBackPress = () => {
    router.back()
    scrollViewRef.current?.scrollTo({
      x: 0,
      animated: true
    })
  }

  return (
    <View style={styless.container}>
      <CustomHeader onBackPress={onBackPress} />
      <Steps />
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false
        })}
        scrollEventThrottle={16}
        scrollEnabled={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
      >
        {slides.map((slide, index) => (
          <ScrollView
            key={index}
            showsVerticalScrollIndicator={false}
            style={[styles.pt40, { width }]}
          >
            {/* <VisitsTypes />
            <TherapistList /> */}
            {slide.component()}
          </ScrollView>
        ))}
      </Animated.ScrollView>

      <Button
        title="Next"
        onPress={handleNext}
        containerStyles={{
          position: "absolute",
          bottom: 8,
          width: "100%",
          backgroundColor: "transparent",
          zIndex: 1000
        }}
        variant="primary"
      />
    </View>
  )
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible"
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 16
  },
  headerText: {
    color: colors.white
  },
  imageContainer: {
    width: width - 32,
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  imageWrapper: {
    position: "absolute",
    top: -32,
    width: width - 32
  },
  image: {
    resizeMode: "contain",
    width: undefined,
    height: undefined,
    aspectRatio: 0.5
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
    borderTopRightRadius: 30
  }
})
