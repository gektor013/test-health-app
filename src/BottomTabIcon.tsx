import AppointmentCreateIcon from "#/icons/calendar_plus.svg"
import ProfileIcon from "#/icons/profile.svg"
import VideoIcon from "#/icons/video.svg"

import AppoinmentIcon from "#/icons/calendar.svg"
import React from "react"
import { View } from "react-native"

import HomeIcon from "#/icons/home.svg"
import { colors } from "./constants"

interface Props {
  route: string
  isFocused: boolean
}

const BottomTabIcon = ({ route, isFocused }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderIcon = (route: string, isFocused: boolean) => {
    let height: number = 22
    let width: number = 22

    switch (route) {
      case "index":
        return (
          <HomeIcon
            width={width}
            height={height}
            fill={isFocused ? colors.green : colors.gray}
          />
        )
      case "appointment":
        return (
          <AppoinmentIcon
            width={width}
            height={height}
            fill={isFocused ? colors.green : colors.gray}
          />
        )
      case "appointement-create":
        return (
          <AppointmentCreateIcon
            width={width}
            height={height}
            fill={isFocused ? colors.green : colors.gray}
          />
        )
      case "video":
        return (
          <VideoIcon
            width={width}
            height={height}
            fill={isFocused ? colors.green : colors.gray}
          />
        )
      case "profile":
        return (
          <ProfileIcon
            width={width}
            height={height}
            fill={isFocused ? colors.green : colors.gray}
          />
        )
      default:
        break
    }
  }

  return <View>{renderIcon(route, isFocused)}</View>
}

export default BottomTabIcon
