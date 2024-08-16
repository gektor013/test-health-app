import { colors } from "@/constants"
import { SVGIcon, VectorExpoIcons } from "@/shared/components"
import React from "react"
import { StyleSheet, View } from "react-native"

export const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <SVGIcon name="empty_avatar" size={100} />
          <VectorExpoIcons
            type="Feather"
            name="edit"
            size={15}
            color={colors.green}
            style={styles.editIcon}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    gap: 16
    // backgroundColor: "red"
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16
  },
  avatarContainer: {
    position: "relative"
  },
  editIcon: {
    position: "absolute",
    right: 1,
    bottom: 5
  }
})
