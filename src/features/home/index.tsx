import { StyleSheet, View } from "react-native"

import { Header, SearchInput } from "@/shared/components"

import { TherapistsSpecialist } from "./_components/therapists-specialist"
import { UpcomingAppointment } from "./_components/upcoming-appointment"

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SearchInput />
      <UpcomingAppointment />
      <TherapistsSpecialist />
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
