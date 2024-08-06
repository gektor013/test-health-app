import { ScrollView, View } from "react-native"

import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { styles } from "./styles"

export const AppointmentCreate = () => {
  return (
    // <ScreenContainer style={{ backgroundColor: "green" }}>
    <View style={styles.container}>
      <Steps />

      <ScrollView style={styles.pt40}>
        <VisitsTypes />

        <TherapistList />
      </ScrollView>
    </View>
    // </ScreenContainer>
  )
}
