import React, { useEffect, useState } from "react"
import { SvgProps, SvgXml } from "react-native-svg"

import { colors } from "@/constants"
import * as SVGIcons from "@/constants/icons"
import { SVGIconNames } from "@/types/icons"

interface SourceUrl {
  uri: string
  name?: SVGIconNames
}
interface SourceName {
  name: SVGIconNames
  uri?: string
}

type Source = SourceUrl | SourceName
type Props = Source & {
  width?: number
  height?: number
  size?: number
  color?: string
  strokeWidth?: number
} & SvgProps

export const SVGIcon: React.FC<Props> = ({
  name,
  width = 24,
  height = 24,
  size,
  color = colors.black,
  uri,
  strokeWidth = 0.1,
  ...rest
}) => {
  const [imgXml, setImgXml] = useState("<svg></svg>")
  const IconComponent = name ? SVGIcons[name].default : undefined

  const getImgXml = async (uri: string) => {
    const xml = await (await fetch(uri)).text()
    setImgXml(xml)
  }

  useEffect(() => {
    if (uri) {
      getImgXml(uri)
    }
  }, [uri])

  if (uri) {
    return (
      <SvgXml
        xml={imgXml
          .replace(/fill="#[0-9a-f]{6}"/g, `fill="${color}"`)
          .replace(/stroke="#[0-9a-f]{6}"/g, `stroke="${color}"`)}
        width={size ?? width}
        height={size ?? height}
        strokeWidth={strokeWidth}
      />
    )
  } else if (IconComponent)
    return (
      <IconComponent
        {...rest}
        width={size ?? width}
        height={size ?? height}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    )

  return null
}
