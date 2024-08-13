import { slides } from "@/features/onboarding/util"
import { router, usePathname } from "expo-router"
import { useRef, useState } from "react"
import { Animated, ScrollView } from "react-native"

interface ReturnStepData {
  currentIndex: number
  stepsMethods: {
    handleNext: () => void
    onBackPress: () => void
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  }
  refs: {
    scrollX: Animated.Value
    scrollViewRef: React.RefObject<ScrollView>
  }
}

export const useSetStep = (width: number): ReturnStepData => {
  const scrollViewRef = useRef<ScrollView>(null)
  const pathName = usePathname()
  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)
  // console.log(scrollX, "scrollX", currentIndex, "currentIndex")

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
  

  // ITS NEED FOR CORRECT ANIMATION WORK
  // useEffect(() => {
  //   if (pathName === "/upload-document") {
  //     setCurrentIndex(2)
  //     scrollViewRef.current?.scrollTo({
  //       x: 750,
  //       animated: false
  //     })
  //   }
  // }, [pathName, currentIndex])

  return {
    currentIndex,
    stepsMethods: {
      handleNext,
      onBackPress,
      setCurrentIndex
    },
    refs: {
      scrollX,
      scrollViewRef
    }
  }
}
