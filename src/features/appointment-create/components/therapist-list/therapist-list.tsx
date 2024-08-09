import { Pressable, StyleSheet, Text, View } from "react-native"
import { Control, Controller } from "react-hook-form"

import { CheckBox, Therapist } from "@/shared/components"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { EmployeesResponse } from "@/types/employees/employees.type"
import { commonHelpers } from "@/utils/helpers/common"

interface Props {
  control: Control<AppointmentCreateSchemaData>
  data: EmployeesResponse[] | undefined
}

const width = commonHelpers.getDimensionsParams().width - 32

export const TherapistList = ({ data, control }: Props) => {
  return (
    <View style={styles.therapistListMainContainer}>
      <Text style={styles.title}>Select the therapist</Text>

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
}

const styles = StyleSheet.create({
  therapistListMainContainer: {
    gap: 16,
    paddingTop: 32,
    marginBottom: 100,
    position: "relative",
    width
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
