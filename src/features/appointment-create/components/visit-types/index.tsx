import { StyleSheet, Text, View } from "react-native"

import { ServiceResponse } from "@/types/service/service.type"
import { VisitType } from "./visit-type"

interface Props {
  data: ServiceResponse[] | undefined
}

export const VisitsTypes = ({ data }: Props) => {
  return (
    <View style={styles.visitsContainer}>
      <Text style={styles.visitsContainerTitle}>Select the type of visit</Text>

      <View style={styles.visitsItemsContainer}>
        {data?.map((item) => (
          <VisitType
            key={item.id}
            icon={"manual_terapy"}
            title={item.name}
            isActive={item.id === 1}
          />
        ))}
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
