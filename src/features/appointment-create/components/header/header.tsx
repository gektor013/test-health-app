import { Pressable, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { VectorExpoIcons } from "@/shared/components"
import { useNavigation } from "@react-navigation/native"

export const CustomHeader = () => {
  const navigations = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigations.goBack()} style={styles.iconPress}>
        <VectorExpoIcons
          type="MaterialIcons"
          name="arrow-back-ios-new"
          color={colors.black}
          size={20}
        />
      </Pressable>
      <Text style={styles.title}>Book a new appointment</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    position: "relative",
    paddingVertical: 10
  },
  iconPress: {
    position: "absolute",
    left: 0
  },
  title: {
    fontSize: 17
  }
})
