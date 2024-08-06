import { Therapist } from "@/shared/components"
import { StyleSheet, Text, View } from "react-native"

export const TherapistList = () => {
  return (
    <View style={{ paddingTop: 32, gap: 16 }}>
      <Text style={{ fontWeight: "600", lineHeight: 17 }}>Select the therapist</Text>

      <View style={{ flex: 1, justifyContent: "space-between", gap: 16 }}>
        <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
        <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
        <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
        <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
