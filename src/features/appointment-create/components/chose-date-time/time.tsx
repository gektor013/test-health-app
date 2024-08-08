import { Pressable, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { commonHelpers } from "@/utils/helpers/common"

const time = [
  "08:00-08:45",
  "09:00-09:45",
  "10:00-10:45",
  "11:00-11:45",
  "12:00-12:45",
  "13:00-13:45",
  "14:00-14:45",
  "15:00-15:45",
  "16:00-16:45",
  "17:00-17:45",
  "18:00-18:45",
  "19:00-19:45",
  "20:00-20:45"
]

const width = commonHelpers.getDimensionsParams().width - 32
export const ChooseTime = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose time</Text>
      <View style={styles.timeContainer}>
        {time.map((t, i) => (
          <Pressable key={t} style={[styles.time, i === 1 && styles.timeActive]}>
            <Text style={[i === 1 && styles.timeActive]}>11:00-11:45</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  title: { fontWeight: "600", lineHeight: 17 },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    flex: 1,
    justifyContent: "space-between",
    maxWidth: width
  },
  time: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8,
    maxWidth: 109
  },
  timeActive: {
    backgroundColor: colors.green,
    color: colors.white
  }
})
