import { ScrollView, View } from "react-native"

import { Button } from "@/shared/components"

import { CustomHeader } from "./components/header/header"
import { Steps } from "./components/steps"
import { TherapistList } from "./components/therapist-list/therapist-list"
import { VisitsTypes } from "./components/visit-types"
import { styles } from "./styles"

export const AppointmentCreate = () => {
  return (
    <View style={styles.container}>
      <CustomHeader />
      <Steps />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.pt40}>
        <VisitsTypes />

        <TherapistList />
      </ScrollView>
      <Button
        title="Next"
        containerStyles={{
          bottom: 0,
          width: "100%",
          backgroundColor: "transparent",
          zIndex: 1000
        }}
        variant="primary"
      />
    </View>
  )
}
