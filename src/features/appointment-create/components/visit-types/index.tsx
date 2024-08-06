import { StyleSheet, Text, View } from "react-native"
import { VisitType } from "./visit-type"

export const VisitsTypes = () => {
  return (
    <View style={styles.visitsContainer}>
      <Text style={styles.visitsContainerTitle}>Select the type of visit</Text>

      <View style={styles.visitsItemsContainer}>
        <VisitType icon="massage" title="Massage" isActive={true} />
        <VisitType icon="manual_terapy" title="Manual therapy" isActive={false} />
        <VisitType icon="kinesitherapie" title="Kinesitherapia" isActive={false} />
        <VisitType icon="osteopat" title="Osteopathy" isActive={false} />
        <VisitType
          icon="neurokinetic_therapy"
          title="Neurokinetička terapija"
          isActive={false}
        />
        <VisitType icon="stretching" title="Miofascijalna istezanja" isActive={false} />
        <VisitType icon="shock_teraphy" title="Terapija udarnim valom" isActive={false} />
        <VisitType icon="medestec_tretman" title="Medestec tretman" isActive={false} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  visitsContainer: {
    gap: 16
  },
  visitsContainerTitle: {
    fontWeight: "600"
  },
  visitsItemsContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  }
})
