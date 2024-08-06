import { colors } from "@/constants";
import { StyleSheet, Text, View } from "react-native";

export const Steps = () => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.step}>
        <View style={styles.transparentRound}>
          <View style={[styles.circle, styles.active]}>
            <Text style={[styles.stepNumberActive, { color: colors.white }]}>1</Text>
          </View>
          <Text style={styles.stepLabelActive}>Choose a type and therapist</Text>
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.step}>
        <View style={[styles.transparentRound, { borderColor: "transparent" }]}>
          <View style={styles.circle}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepLabel}>Select the date and time</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.step}>
        <View style={[styles.transparentRound, { borderColor: "transparent" }]}>
          <View style={styles.circle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Patient details and Confirmation</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  step: {
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  transparentRound: {
    position: "relative",
    width: 58,
    height: 58,
    borderWidth: 17,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.transparent_green,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  stepNumber: {
    fontSize: 18,
    color: "#ccc",
  },
  stepNumberActive: {
    fontSize: 18,
    color: "#4CAF50",
  },
  stepLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#ccc",
    position: "absolute",
    top: 40,
    lineHeight: 13,
    textAlign: "center",
    width: 100,
  },
  stepLabelActive: {
    position: "absolute",
    top: 40,
    marginTop: 8,
    fontSize: 12,
    lineHeight: 13,

    color: "#000",
    textAlign: "center",
    width: 91,
  },
  line: {
    height: 2,
    // width: 40,
    flexGrow: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
});
