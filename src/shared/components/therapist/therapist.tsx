import { Image, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"

import DoctorImg from "#/doctors/doctor-1.png"
import StarIcon from "#/icons/star.svg"

interface Props {
  name: string
  teraphyType: string
  rating: number
}

export const Therapist = ({ name, rating, teraphyType }: Props) => {
  return (
    <View style={styles.threpistConstainer}>
      <Image source={DoctorImg} style={styles.therapistImg} />
      <View style={styles.therapistInfoContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={{ color: colors.green }}>{teraphyType}</Text>
        <Text>
          <StarIcon /> {rating}(12)
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
