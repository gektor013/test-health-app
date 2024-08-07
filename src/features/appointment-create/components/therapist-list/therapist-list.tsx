import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { CheckBox, Therapist } from "@/shared/components"

export const TherapistList = () => {
  const [check, setCheck] = useState(false)
  return (
    <View style={styles.therapistListMainContainer}>
      <Text style={styles.title}>Select the therapist</Text>

      <View style={styles.listContainer}>
        <View style={styles.therapistContainer}>
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
        <View style={styles.therapistContainer}>
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
        <View style={styles.therapistContainer}>
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
        <View style={styles.therapistContainer}>
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  therapistListMainContainer: {
    gap: 16,
    paddingTop: 32,
    marginBottom: 100,
    position: "relative"
  },
  title: {
    lineHeight: 17,
    fontWeight: "600"
  },
  listContainer: {
    flex: 1,
    gap: 16,
    justifyContent: "space-between"
  },
  therapistContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})
