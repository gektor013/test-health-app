import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"
import { router } from "expo-router"

import { Button } from "@/shared/components"
import { commonHelpers } from "@/utils/helpers/common"
import NetInfo from "@react-native-community/netinfo"

import NoConnectionImg from "#/images/no-connection.png"

const width = commonHelpers.getDimensionsParams().width

export const NoConnection = () => {
  const retryConnection = async () => {
    try {
      const state = await NetInfo.fetch()
      if (state.isConnected) {
        router.replace("/")
      } else {
        alert("No internet connection. Please try again.")
      }
    } catch (error) {
      console.error("Error checking internet connection:", error)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={NoConnectionImg} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>No Internet connection</Text>
          <Text style={styles.subtitle}>
            Please check your Internet connection and try again
          </Text>
        </View>
        <Button onPress={retryConnection} title="Retry" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    gap: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: width - 32,
    height: 344
  },
  bottomContainer: {
    gap: 32
  },
  infoContainer: {
    gap: 15,
    alignItems: "center"
  },
  title: {
    fontSize: 19
  },
  subtitle: {
    textAlign: "center"
  }
})
