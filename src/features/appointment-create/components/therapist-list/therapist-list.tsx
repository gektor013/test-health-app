import { CheckBox, Therapist } from "@/shared/components"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { EmployeesResponse } from "@/types/employees/employees.tpye"
import { commonHelpers } from "@/utils/helpers/common"
import { Control, Controller } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"

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
                  // img={}
                  teraphyType={employee.employee.speciality}
                  rating={5.0}
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
