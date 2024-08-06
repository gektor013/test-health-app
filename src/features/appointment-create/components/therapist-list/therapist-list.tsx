import { CheckBox, Therapist } from "@/shared/components"
import { useState } from "react"
import { Text, View } from "react-native"

export const TherapistList = () => {
  const [check, setCheck] = useState(false)
  return (
    <View style={{ paddingTop: 32, gap: 16, position: "relative", marginBottom: 60 }}>
      <Text style={{ fontWeight: "600", lineHeight: 17 }}>Select the therapist</Text>

      <View style={{ flex: 1, justifyContent: "space-between", gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Therapist name="Ronnie C. Torres" teraphyType="massage" rating={5.0} />
          <CheckBox onPress={() => setCheck(!check)} isChecked={check} />
        </View>
      </View>
    </View>
  )
}
