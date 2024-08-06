import { ScrollView, View } from "react-native"

import { Button } from "@/shared/components"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { styles } from "./styles"

export const AppointmentCreate = () => {
  return (
    <View style={styles.container}>
      <Steps />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.pt40}>
        <VisitsTypes />

        <TherapistList />
      </ScrollView>
      <Button
        title="Next"
        containerStyles={{ bottom: 10, width: "100%" }}
        variant="primary"
      />
    </View>
  )
}
