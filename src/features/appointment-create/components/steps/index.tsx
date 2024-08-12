import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"

interface Props {
  currentIndexStep: number
}

export const Steps = ({ currentIndexStep }: Props) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.step}>
        <View
          style={[
            styles.transparentRound,
            {
              borderColor:
                currentIndexStep === 0 ? colors.transparent_green : "transparent"
            }
          ]}
        >
          <View style={[styles.circle, currentIndexStep === 0 && styles.active]}>
            <Text
              style={[
                styles.stepNumber,
                currentIndexStep === 0 && styles.stepNumberActive
              ]}
            >
              1
            </Text>
          </View>
          <Text
            style={[styles.stepLabel, currentIndexStep === 0 && styles.stepLabelActive]}
          >
            Choose a type and therapist
          </Text>
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.step}>
        <View
          style={[
            styles.transparentRound,
            {
              borderColor:
                currentIndexStep === 1 ? colors.transparent_green : "transparent"
            }
          ]}
        >
          <View style={[styles.circle, currentIndexStep === 1 && styles.active]}>
            <Text
              style={[
                styles.stepNumber,
                currentIndexStep === 1 && styles.stepNumberActive
              ]}
            >
              2
            </Text>
          </View>
          <Text
            style={[styles.stepLabel, currentIndexStep === 1 && styles.stepLabelActive]}
          >
            Select the date and time
          </Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.step}>
        <View
          style={[
            styles.transparentRound,
            {
              borderColor:
                currentIndexStep === 2 ? colors.transparent_green : "transparent"
            }
          ]}
        >
          <View style={[styles.circle, currentIndexStep === 2 && styles.active]}>
            <Text
              style={[
                styles.stepNumber,
                currentIndexStep === 2 && styles.stepNumberActive
              ]}
            >
              3
            </Text>
          </View>
          <Text
            style={[styles.stepLabel, currentIndexStep === 2 && styles.stepLabelActive]}
          >
            Patient details and Confirmation
          </Text>
        </View>
      </View>
    </View>
  )
}

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
