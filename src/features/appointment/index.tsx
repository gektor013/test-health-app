import { ScrollView, Text, View } from "react-native"

import { SegmentedControl } from "@/shared/components"
import { useSlideStep } from "@/shared/hooks"
import { commonHelpers } from "@/utils/helpers/common"

import Animated from "react-native-reanimated"

const options = ["Upcoming", "Completed", "Cancelled"]
const width = commonHelpers.getDimensionsParams().width

export const Appointment = () => {
  const { slideIndex, animatedStyle, stepsMethods } = useSlideStep(width)

  return (
    <View style={{ flex: 1 }}>
      <SegmentedControl
        options={options}
        selectedOption={slideIndex}
        onOptionPress={stepsMethods.handleSetSlideIndex}
      />
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            width: width * 3
          },
          animatedStyle
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={[{ width }]}>
          <Text style={{ textAlign: "center", backgroundColor: "red" }}>1 slide</Text>
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} style={[{ width }]}>
          <Text style={{ textAlign: "center", backgroundColor: "red" }}>2 slide</Text>
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} style={[{ width }]}>
          <Text style={{ textAlign: "center", backgroundColor: "red" }}>3 slide</Text>
        </ScrollView>
      </Animated.View>
    </View>
  )
}
