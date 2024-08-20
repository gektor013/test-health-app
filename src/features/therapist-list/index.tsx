import React from "react"
import { StyleSheet, View } from "react-native"
import { ListWorks } from "./_components/list-works"

export const TherapistList = () => {
  return (
    <View style={{ flex: 1 }}>
      <ListWorks />
      <View style={{ padding: 1 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({})
