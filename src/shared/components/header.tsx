import { router } from "expo-router"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { colors } from "@/constants"

import { useAppSelector } from "@/redux"
import { Avatar, SVGIcon, Text } from "./ui-kit"

export const Header = () => {
  const user = useAppSelector((s) => s.auth.user)

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Avatar uri={user?.image} />
        <Text style={styles.greenText}>
          Hi, <Text style={styles.text}>{user?.name}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/notifications")}>
        <SVGIcon name="bell" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  greenText: {
    fontSize: 17,
    color: colors.green
  },
  text: {
    fontSize: 17,
    color: colors.black
  }
})
