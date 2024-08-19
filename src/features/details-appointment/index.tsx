import { colors } from "@/constants"
import { SVGIcon, Therapist } from "@/shared/components"
import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

export const DetailsAppointment = () => {
  return (
    <ScrollView contentContainerStyle={{ gap: 20 }}>
      <View
        style={{
          backgroundColor: colors.green,
          paddingVertical: 8,
          paddingHorizontal: 16
        }}
      >
        <Text style={{ color: colors.white }}>Status: Confirmed</Text>
      </View>
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <ScrollView>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.light_gray,
              padding: 16,
              gap: 16,
              borderRadius: 10
            }}
          >
            <Text>Appointment therapist</Text>
            <Therapist
              rating="4.5"
              name="Dr. John Doe"
              teraphyType="Massage, Room 53"
              img={"/media/66b9d85b61ed9_profile-11.jpg"}
            />
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.light_gray,
              padding: 16,
              gap: 16,
              borderRadius: 10
            }}
          >
            <Text>Appointment details</Text>

            <View style={{ flexDirection: "row", gap: 16 }}>
              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <SVGIcon name="user" />
                  <Text>Ronnie C. Torres</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <SVGIcon name="calendar" color={colors.green} />
                  <Text>02.09.2024</Text>
                </View>
              </View>

              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <SVGIcon name="location" />
                  <Text>Room 123</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                  <SVGIcon name="clock" />
                  <Text>9:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            borderWidth: 1,
            borderColor: colors.light_gray,
            padding: 16,
            gap: 16,
            borderRadius: 10
          }}
        >
          <Text>Patient details</Text>
          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <SVGIcon name="user" />
              <Text>Kevin Lablabce, Male, 26</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <SVGIcon name="phone" />
              <Text>+1 (999) 111-0000</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: colors.light_gray,
            padding: 16,
            gap: 16,
            borderRadius: 10
          }}
        >
          <Text>Uploaded documents</Text>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 16,
              backgroundColor: colors.light_gray,
              borderRadius: 12,
              gap: 10,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <SVGIcon name="pdf" size={27} />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "600" }}>document№1.pdf</Text>
              <Text>123 MB</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: colors.light_gray,
            padding: 16,
            gap: 16,
            borderRadius: 10
          }}
        >
          <Text>Appointment therapist</Text>
          <Therapist
            rating="4.5"
            name="Dr. John Doe"
            teraphyType="Massage, Room 53"
            img={"/media/66b9d85b61ed9_profile-11.jpg"}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
