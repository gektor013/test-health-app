import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"

import { Accordion } from "@/shared/components"
import data from "@/utils/default-datas/faq"

export const Faq = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((value, index) => {
          return <Accordion value={value} key={index} />
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  }
})
