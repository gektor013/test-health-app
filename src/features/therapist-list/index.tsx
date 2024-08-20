import { colors } from "@/constants"
import { ThrerapistDetail } from "@/shared/components"
import { router } from "expo-router"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { DatePicker } from "./_components/date-picker"
import { ListWorks } from "./_components/list-works"

export const TherapistList = () => {
  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <ListWorks />
        <DatePicker />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.therapistContainer}
      >
        <View style={{ marginTop: 0 }} />
        <TouchableWithoutFeedback onPress={() => router.push("/therapist-details")}>
          <ThrerapistDetail />
        </TouchableWithoutFeedback>
        <View style={styles.devider} />
        <TouchableWithoutFeedback onPress={() => router.push("/therapist-details")}>
          <ThrerapistDetail />
        </TouchableWithoutFeedback>
        <View style={styles.devider} />
        <TouchableWithoutFeedback onPress={() => router.push("/therapist-details")}>
          <ThrerapistDetail />
        </TouchableWithoutFeedback>
        <View style={styles.devider} />
        <ThrerapistDetail />
        <View style={styles.devider} />
        <ThrerapistDetail />
        <View style={styles.devider} />
        <ThrerapistDetail />
        <View style={styles.devider} />
        <ThrerapistDetail />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  therapistContainer: {
    gap: 16
  },
  devider: {
    height: 1,
    backgroundColor: colors.light_gray
  }
})
