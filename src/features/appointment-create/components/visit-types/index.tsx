import { StyleSheet, Text, View } from "react-native"

import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { ServiceResponse } from "@/types/service/service.type"
import { Control, Controller } from "react-hook-form"
import { VisitType } from "./visit-type"

interface Props {
  controll: Control<AppointmentCreateSchemaData>
  data: ServiceResponse[] | undefined
}

export const VisitsTypes = ({ data, controll }: Props) => {
  return (
    <View style={styles.visitsContainer}>
      <Text style={styles.visitsContainerTitle}>Select the type of visit</Text>

      <View style={styles.visitsItemsContainer}>
        {data?.map((item) => (
          <Controller
            key={item.id}
            control={controll}
            name="service"
            render={({ field: { onChange, value } }) => (
              <VisitType
                key={item.id}
                title={item.name}
                onPress={() => onChange(item)}
                icon={"manual_terapy"}
                isActive={item.id === value?.id}
              />
            )}
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
