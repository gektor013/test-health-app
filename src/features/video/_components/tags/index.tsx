import { Button } from "@/shared/components"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"

export const Tags = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Button variant="primary" title="All" containerStyles={styles.buttonContainer} />
        <Button
          variant="outline"
          title="Nutrition"
          containerStyles={styles.buttonContainer}
        />
        <Button
          variant="outline"
          title="Fitness"
          containerStyles={styles.buttonContainer}
        />
        <Button
          variant="outline"
          title="Fitness"
          containerStyles={styles.buttonContainer}
        />
        <Button
          variant="outline"
          title="Fitness"
          containerStyles={styles.buttonContainer}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    flexDirection: "row"
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
})
