import { useMemo } from "react"
import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from "react-native"

import { colors } from "@/constants"
import { SVGIconNames } from "@/types/icons"

import { SVGIcon } from "./svg-icon"
import { Text } from "./text"

interface Props extends PressableProps {
  variant?: "primary" | "secondary" | "outline" | "round" | "navigation"
  containerStyles?: ViewStyle | ViewStyle[]
  title: string
  icon?: SVGIconNames
  titleStyle?: TextStyle
  customRenderComponent?: () => JSX.Element
  iconRight?: {
    icon: SVGIconNames
    size?: number
    color?: string
  }
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  containerStyles,
  title,
  icon,
  disabled,
  titleStyle,
  iconRight,
  customRenderComponent,
  ...rest
}) => {
  const IconLeft = useMemo(() => {
    if (variant === "round") {
      return <SVGIcon name={"arrow_back_ios_new"} color={colors.white} />
    } else if (icon) {
      return <SVGIcon name={icon} color={colors.white} />
    }
    return null
  }, [icon, variant])

  const getContainerStyle = ({ pressed }: { pressed: boolean }) => {
    let colorStyles = containerColorStyles[variant]

    if (pressed) colorStyles = containerPressedColorStyles[variant]
    if (disabled) colorStyles = containerDisabledColorStyles[variant]

    return [styles.container, colorStyles, containerStyles]
  }

  return (
    <Pressable style={getContainerStyle} disabled={disabled} {...rest}>
      {IconLeft}
      {variant !== "round" && (
        <Text style={[styles.text, textColorStyles[variant], titleStyle]}>{title}</Text>
      )}
      {iconRight && (
        <SVGIcon name={iconRight.icon} color={iconRight.color} size={iconRight.size} />
      )}

      {customRenderComponent && customRenderComponent()}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12
  },
  text: {
    color: colors.white
  }
})

const containerColorStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.dark_green,
    borderColor: colors.dark_green
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.white
  },
  outline: {
    backgroundColor: colors.white,
    borderColor: colors.green
  },
  round: {
    width: 40,
    height: 40,
    backgroundColor: colors.dark_green,
    borderColor: colors.dark_green,
    borderRadius: 40
  },
  navigation: {
    backgroundColor: colors.white,
    borderColor: colors.white
  }
})

const containerPressedColorStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.light_green,
    borderColor: colors.light_green
  },
  secondary: {
    backgroundColor: colors.light_green,
    borderColor: colors.light_green
  },
  outline: {
    backgroundColor: colors.white,
    borderColor: colors.light_green
  },
  round: {
    width: 40,
    height: 40,
    backgroundColor: colors.light_green,
    borderColor: colors.light_green,
    borderRadius: 40
  },
  navigation: {
    backgroundColor: colors.light_green,
    borderColor: colors.light_green
  }
})

const containerDisabledColorStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled
  },
  secondary: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled
  },
  outline: {
    backgroundColor: colors.white,
    borderColor: colors.light_gray
  },
  round: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled
  },
  navigation: {
    backgroundColor: colors.light_green,
    borderColor: colors.light_green
  }
})

const textColorStyles = StyleSheet.create({
  primary: {},
  secondary: {},
  outline: {
    color: colors.black
  },
  round: {},
  navigation: {}
})
