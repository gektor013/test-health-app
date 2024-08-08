import { router } from "expo-router"
import { useRef, useState } from "react"
import { Animated, ScrollView, View } from "react-native"

import { Button } from "@/shared/components"
// import { slides } from "../onboarding/util"
import { commonHelpers } from "@/utils/helpers/common"

import { ChooseDate } from "./components/chose-date-time/date"
import { ChooseTime } from "./components/chose-date-time/time"
import { CustomHeader } from "./components/header/header"
import { Patientdetails } from "./components/patient-form/patient-form"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { styles } from "./styles"

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
    component: () => (
      <View style={{ flex: 1, gap: 32, marginBottom: 100 }}>
        <ChooseDate />
        <ChooseTime />
      </View>
    )
  },
  {
    id: 3,
    component: () => <Patientdetails />
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
    <View style={styles.container}>
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
          width: "100%"
        }}
        variant="primary"
      />
    </View>
  )
}
