import { Platform, ScrollView, StyleSheet, View } from "react-native"

import { Header } from "@/shared/components"

import { AvailableToday } from "./_components/available-today"
import { TherapistsSpecialist } from "./_components/therapists-specialist"
import { UpcomingAppointment } from "./_components/upcoming-appointment"

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 24 }}
      >
        <UpcomingAppointment />
        <TherapistsSpecialist />
        <AvailableToday />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    gap: 24,
    paddingTop: Platform.OS === "android" ? 20 : 0
  }
})
