import { StyleSheet, View } from "react-native"
import { SharedValue } from "react-native-reanimated"
import React from "react"

import { PaginationDot } from "@/shared/components"

interface OnboardingData {
  id: number
  text: string
  textColor: string
  backgroundColor: string
}

type Props = {
  data: OnboardingData[]
  x: SharedValue<number>
}
export const Pagination = ({ data, x }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
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
