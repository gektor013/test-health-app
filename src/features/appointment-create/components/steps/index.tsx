import { Pressable, StyleSheet, Text, View } from "react-native"
import React, { memo } from "react"

import { colors } from "@/constants"

interface Props {
  currentIndexStep: number
  onSetStep: (step: number) => void
}

const SLIDERS_DATA = [
  { title: "Choose a type and therapist", id: 0, step: 1 },
  { title: "Select the date and time", id: 1, step: 2 },
  { title: "Patient details and Confirmation", id: 2, step: 3 }
]

export const Steps = memo(({ currentIndexStep, onSetStep }: Props) => {
  const handleSetStep = (stepId: number) => {
    if (currentIndexStep < stepId) return
    onSetStep(stepId)
  }

  return (
    <View style={styles.stepContainer}>
      {SLIDERS_DATA.map((slide) => (
        <React.Fragment key={slide.id}>
          <Pressable
            onPress={() => handleSetStep(slide.id)}
            style={[
              styles.transparentRound,
              {
                borderColor:
                  currentIndexStep === slide.id ? colors.transparent_green : "transparent"
              }
            ]}
          >
            <View
              style={[
                styles.circle,
                currentIndexStep === slide.id && styles.active,
                currentIndexStep >= slide.step && styles.successStep
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  currentIndexStep >= slide.step && styles.successStep,
                  currentIndexStep === slide.id && styles.stepNumberActive
                ]}
              >
                {slide.step}
              </Text>
            </View>
            <Text
              style={[
                styles.stepLabel,
                currentIndexStep === slide.id && styles.stepLabelActive, //The order in which classes are called is important
                currentIndexStep >= slide.step && styles.successStep
              ]}
            >
              {slide.title}
            </Text>
          </Pressable>
          {slide.id !== SLIDERS_DATA.length - 1 && <View style={styles.line} />}
        </React.Fragment>
      ))}
    </View>
  )
})

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 35,
    justifyContent: "space-between"
  },
  step: {
    alignItems: "center",
    flexDirection: "column",
    position: "relative"
  },
  transparentRound: {
    position: "relative",
    width: 58,
    height: 58,
    borderWidth: 17,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.transparent_green
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center"
  },
  successStep: {
    borderColor: colors.green,
    color: colors.black
  },
  active: {
    borderColor: colors.green,
    backgroundColor: colors.green
  },
  stepNumber: {
    fontSize: 18,
    color: "#ccc"
  },
  stepNumberActive: {
    fontSize: 18,
    color: colors.white
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#ccc",
    position: "absolute",
    top: 40,
    lineHeight: 13,
    textAlign: "center",
    width: 100
  },
  stepLabelActive: {
    position: "absolute",
    top: 40,
    marginTop: 8,
    fontSize: 12,
    lineHeight: 13,
    color: "#000",
    textAlign: "center"
  },
  line: {
    height: 2,
    // width: 40,
    flexGrow: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 8
  }
})
