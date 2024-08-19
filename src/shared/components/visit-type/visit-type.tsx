import { Pressable, StyleSheet, Text } from "react-native"

import { colors } from "@/constants"
import { SVGIconNames } from "@/types/icons"
import { commonHelpers } from "@/utils/helpers/common"
import { SVGIcon } from "../ui-kit"

const container_width = commonHelpers.getDimensionsParams().width - 48

interface Props {
  title: string
  icon: SVGIconNames
  isActive?: boolean
  onPress?: (...event: any[]) => void
}
export const VisitType = ({ icon, title, isActive, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.stepContainer, isActive && styles.activeStepContainer]}
    >
      <SVGIcon
        name={icon}
        color={isActive ? colors.white : colors.green}
        width={40}
        height={40}
      />

      <Text
        style={{ color: isActive ? colors.white : colors.black, textAlign: "center" }}
      >
        {title}
      </Text>
    </Pressable>
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
    borderColor: colors.secondary_gray
  },
  activeStepContainer: {
    borderWidth: 0,
    borderColor: colors.green,
    backgroundColor: colors.green
  }
})
