import { StyleSheet, View } from "react-native"

import { colors } from "@/constants"
import { Header, SearchInput } from "@/shared/components"

import { UpcomingAppointment } from "./_components/upcoming-appointment"

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SearchInput />
      <UpcomingAppointment />
      {/* <Appointment /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    gap: 24
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 0
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: colors.green,

    justifyContent: "center",
    alignItems: "center"
  }
})
