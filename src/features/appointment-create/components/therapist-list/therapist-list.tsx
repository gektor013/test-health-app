import { Control, Controller } from "react-hook-form"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { CheckBox, Therapist } from "@/shared/components"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { EmployeesResponse } from "@/types/employees/employees.type"
import { commonHelpers } from "@/utils/helpers/common"
import { memo } from "react"

interface Props {
  control: Control<AppointmentCreateSchemaData>
  data: EmployeesResponse[] | undefined
  isLoading: boolean
}

const width = commonHelpers.getDimensionsParams().width - 32

export const TherapistList = memo(({ data, control, isLoading }: Props) => {
  return (
    <View style={styles.therapistListMainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select the therapist</Text>
        <ActivityIndicator
          size={"small"}
          color={colors.green}
          style={{
            position: "absolute",
            left: 140,
            display: isLoading ? "flex" : "none"
          }}
        />
      </View>
      <View style={styles.listContainer}>
        {data?.map((employee) => (
          <Controller
            key={employee.id}
            control={control}
            name="employee"
            render={({ field: { onChange, value } }) => (
              <Pressable
                onPress={() => onChange(employee)}
                key={employee.id}
                style={styles.therapistContainer}
              >
                <Therapist
                  name={employee.name}
                  img={employee.image}
                  teraphyType={employee.employee.speciality}
                  rating={employee.rating}
                />
                <CheckBox
                  variant="round"
                  onPress={() => onChange(employee)}
                  isChecked={value.id === employee.id}
                />
              </Pressable>
            )}
          />
        ))}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  therapistListMainContainer: {
    gap: 16,
    paddingTop: 32,
    marginBottom: 100,
    position: "relative",
    width
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative"
  },
  title: {
    lineHeight: 17,
    fontWeight: "600"
  },
  listContainer: {
    flex: 1,
    gap: 16,
    justifyContent: "space-between"
  },
  therapistContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})
