import { colors } from "@/constants"
import { Therapist } from "@/shared/components"
import { Link } from "expo-router"
import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

export const AvailableToday = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available today</Text>
        <View>
          <Link
            href={"/(app)/tabs/appointment"}
            style={{
              color: colors.green
            }}
          >
            See All
          </Link>
          <View style={styles.line} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Therapist
          rating="4.5"
          name="Dr. John Doe"
          teraphyType="Massage, Room 53"
          img={"/media/66b9d85b61ed9_profile-11.jpg"}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 4 }}
        >
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
          <View style={styles.time}>
            <Text>10:00</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 50
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontWeight: "600"
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.green
  },
  bottomContainer: {
    // alignItems: "center"
    gap: 8
  },
  time: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  }
})
