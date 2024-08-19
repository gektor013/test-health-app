import { Accordion } from "@/shared/components"
import data from "@/utils/default-datas/faq"

import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"

export const Faq = () => {
  // useEffect(() => {
  //   maxHeight.value = withTiming(isOpen ? 3000 : 0, { duration: 300 })
  // }, [isOpen])

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
