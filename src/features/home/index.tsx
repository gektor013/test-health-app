import { ScrollView, StyleSheet, View } from "react-native"

import { Header, SearchInput } from "@/shared/components"

import { AvailableToday } from "./_components/available-today"
import { TherapistsSpecialist } from "./_components/therapists-specialist"
import { UpcomingAppointment } from "./_components/upcoming-appointment"

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SearchInput />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 24 }}
      >
        <UpcomingAppointment />
        <TherapistsSpecialist />
        <AvailableToday />
      </ScrollView>
      {/* <Appointment /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    gap: 24
  }
})
