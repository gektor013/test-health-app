import React from "react"
import { StyleSheet, View } from "react-native"
import { SharedValue } from "react-native-reanimated"

import { PaginationDot } from "@/shared/components"
import { AppointmentPrivateResponse } from "@/types/appointment/appointment.types"

type Props = {
  data?: AppointmentPrivateResponse[]
  x: SharedValue<number>
}
export const Pagination = ({ data, x }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {data?.map((_, index) => {
        return <PaginationDot index={index} x={x} key={index} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row"
  }
})
