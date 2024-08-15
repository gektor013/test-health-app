import { colors } from "@/constants"
import { UserVideoResponse } from "@/types/user-video/user-video.type"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"

interface Props {
  data: UserVideoResponse
}

export const Video = ({ data }: Props) => {
  return (
    <View style={styles.videoContainer}>
      <YoutubePlayer height={200} videoId={data.hash} />
      <Text style={styles.videoTitle}>{data.title}</Text>
      <Text style={styles.videoSubtitle}>{data.category}</Text>
      <Text style={styles.videoTitle}>{data.firstDescription}</Text>
      <Text style={styles.videoTitle}>{data.secondDescription}</Text>
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
