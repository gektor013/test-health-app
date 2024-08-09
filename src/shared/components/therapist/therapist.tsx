import { Image, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"

import StarIcon from "#/icons/star.svg"
import { API_URL } from "@/constants/enviroments"

interface Props {
  name: string
  teraphyType: string
  rating: string
  img?: string | null
}

export const Therapist = ({ name, rating, teraphyType, img }: Props) => {
  return (
    <View style={styles.threpistConstainer}>
      <Image source={{ uri: `${API_URL}${img}` }} style={styles.therapistImg} />
      <View style={styles.therapistInfoContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={{ color: colors.green }}>{teraphyType}</Text>
        <Text>
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
  therapistInfoContainer: {
    justifyContent: "center"
  },
  text: {
    fontWeight: "600",
    lineHeight: 17
  }
})
