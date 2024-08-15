import VideoPreviewImg from "#/images/video/video_preview.png"
import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"
import React from "react"
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

export const Video = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.videoContainer}>
        <ImageBackground source={VideoPreviewImg} style={styles.video}>
          <TouchableOpacity>
            <SVGIcon name="play_transparent" size={72} color={colors.white} />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.videoTitle}>How to Balance Your Diet</Text>
        <Text style={styles.videoSubtitle}>Nutrition</Text>
        <View style={styles.divider} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
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
