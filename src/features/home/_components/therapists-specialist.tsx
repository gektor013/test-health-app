import React from "react"
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { VisitType } from "@/shared/components"

export const TherapistsSpecialist = () => {
  const { data: servicesData, isLoading } = useGetAllServicesQuery()

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Therapists' specialties</Text>
        <ActivityIndicator
          size="small"
          color={colors.green}
          style={{ display: isLoading ? "flex" : "none" }}
        />
      </View>
      <ScrollView
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gap8}
      >
        {servicesData?.data.map((service) => (
          <VisitType key={service.id} icon={service.image} title={service.name} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  gap8: {
    gap: 8
  },
  titleContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontWeight: "600"
  }
})
