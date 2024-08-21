import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"

import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { VisitType } from "@/shared/components"

export const TherapistsSpecialist = () => {
  const { data: servicesData } = useGetAllServicesQuery()

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "600" }}>Therapists' specialties</Text>
      <ScrollView
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gap8}
      >
        {servicesData?.data.map((service) => (
          <VisitType key={service.id} icon="massage" title={service.name} />
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
  }
})
