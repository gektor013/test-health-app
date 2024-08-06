import { StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { SVGIcon } from "@/shared/components"
import { SVGIconNames } from "@/types/icons"
import { commonHelpers } from "@/utils/helpers/common"

const container_width = commonHelpers.getDimensionsParams().width - 48

interface Props {
  title: string
  icon: SVGIconNames
  isActive: boolean
}
export const Stepitem = ({ icon, title, isActive }: Props) => {
  return (
    <View style={[styles.stepContainer, isActive && styles.activeStepContainer]}>
      <SVGIcon
        name={icon}
        color={isActive ? colors.white : colors.green}
        width={40}
        height={40}
      />
      <Text style={{ color: isActive ? colors.white : colors.black }}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    paddingHorizontal: 5,
    backgroundColor: colors.white,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: container_width / 3,
    height: container_width / 3,
    borderWidth: 1,
    borderColor: colors.light_gray
  },
  activeStepContainer: {
    borderWidth: 0,
    borderColor: colors.green,
    backgroundColor: colors.green
  }
})
