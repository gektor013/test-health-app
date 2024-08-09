import { useState } from "react"

import { CheckBox, Therapist } from "@/shared/components"
import { EmployeesResponse } from "@/types/employees/employees.tpye"
import { commonHelpers } from "@/utils/helpers/common"
import { StyleSheet, Text, View } from "react-native"

interface Props {
  data: EmployeesResponse[] | undefined
}

const width = commonHelpers.getDimensionsParams().width - 32

export const TherapistList = ({ data }: Props) => {
  const [check, setCheck] = useState(false)
  return (
    <View style={styles.therapistListMainContainer}>
      <Text style={styles.title}>Select the therapist</Text>

      <View style={styles.listContainer}>
        {data?.map((employee) => (
          <View key={employee.id} style={styles.therapistContainer}>
            <Therapist
              name={employee.name}
              teraphyType={employee.employee.speciality}
              rating={5.0}
            />
            <CheckBox
              onPress={() => setCheck(!check)}
              isChecked={check}
              variant="round"
            />
          </View>
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
