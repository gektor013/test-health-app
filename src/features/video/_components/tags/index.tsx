import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"

import { Button } from "@/shared/components"
import { CategoriesResponse } from "@/types/categories/categories.type"

interface Props {
  currentCategory: string | null
  setCategory: (category: string | null) => void
  data: CategoriesResponse[] | undefined
}

export const Tags = ({ data, currentCategory, setCategory }: Props) => {
  if (!data?.length) return
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Button
          title="All"
          onPress={() => setCategory(null)}
          variant={!currentCategory ? "primary" : "outline"}
          containerStyles={styles.buttonContainer}
        />
        {data.map((category) => (
          <Button
            key={category.id}
            onPress={() => setCategory(category.name)}
            variant={currentCategory === category.name ? "primary" : "outline"}
            title={category.name}
            containerStyles={styles.buttonContainer}
          />
        ))}
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
