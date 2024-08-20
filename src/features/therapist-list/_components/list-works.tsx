import { Button } from "@/shared/components"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"

export const ListWorks = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Button title="Massage" containerStyles={styles.button} />
        <Button
          title="Manual therapy"
          variant="outline"
          containerStyles={styles.button}
        />
        <Button
          title="Kinesitherapia"
          variant="outline"
          containerStyles={styles.button}
        />
        <Button title="Massage" variant="outline" containerStyles={styles.button} />
        <Button
          title="Manual therapy"
          variant="outline"
          containerStyles={styles.button}
        />
        <Button
          title="Kinesitherapia"
          variant="outline"
          containerStyles={styles.button}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  button: {
    paddingHorizontal: 16
  }
})
