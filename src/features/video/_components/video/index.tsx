import { colors } from "@/constants"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"

export const Video = () => {
  return (
    <View style={styles.videoContainer}>
      <YoutubePlayer height={200} videoId={"VWlj001F0cY"} />
      <Text style={styles.videoTitle}>How to Balance Your Diet</Text>
      <Text style={styles.videoSubtitle}>Nutrition</Text>
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  videoContainer: {
    gap: 8
  },
  video: {
    width: "100%",
    height: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  videoTitle: {
    fontWeight: "600"
  },
  videoSubtitle: {
    color: colors.green
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray
  }
})
