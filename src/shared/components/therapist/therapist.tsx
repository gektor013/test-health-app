import { Image, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { API_URL } from "@/constants/enviroments"

import StarIcon from "#/icons/star.svg"

interface Props {
  name: string
  teraphyType: string
  rating?: string
  img?: string | null
  isDetails?: boolean
}

export const Therapist = ({ name, rating, teraphyType, img, isDetails }: Props) => {
  return (
    <View style={styles.threpistConstainer}>
      <Image
        source={{ uri: `${API_URL}${img}` }}
        style={[isDetails ? styles.detailImg : styles.therapistImg]}
      />
      <View style={[styles.therapistInfoContainer, { gap: isDetails ? 8 : 0 }]}>
        <Text style={[styles.text, { fontSize: isDetails ? 19 : 14 }]}>{name}</Text>
        <Text style={{ color: colors.green }}>{teraphyType}</Text>
        <Text style={{ display: rating ? "flex" : "none" }}>
          <StarIcon /> {rating}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  threpistConstainer: {
    gap: 16,
    flexDirection: "row"
  },
  therapistImg: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  detailImg: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  therapistInfoContainer: {
    justifyContent: "flex-start"
  },
  text: {
    fontWeight: "600",
    lineHeight: 17
  }
})
