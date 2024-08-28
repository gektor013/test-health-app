import { Platform, ScrollView, StyleSheet, View } from "react-native"

import { Header } from "@/shared/components"

import { useAppSelector } from "@/redux"
import { useGetMeQuery } from "@/redux/services/user-api"
import { AvailableToday } from "./_components/available-today"
import { TherapistsSpecialist } from "./_components/therapists-specialist"
import { UpcomingAppointment } from "./_components/upcoming-appointment"

export const Home = () => {
  const { data } = useGetMeQuery()

  const user = useAppSelector((s) => s.auth.user)
  console.log(user?.documents?.length, "DOCUMENT")

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
