import { ScrollView, View } from "react-native"

import { Steps } from "./components/steps"
import { VisitsTypes } from "./components/visit-types"
import { styles } from "./styles"

export const AppointmentCreate = () => {
  return (
    <View style={styles.container}>
      <Steps />

      <ScrollView style={styles.pt40}>
        <VisitsTypes />
      </ScrollView>
    </View>
  )
}
