import { colors } from "@/constants";
import * as SVGIcons from "@/constants/icons";
import { SVGIconNames } from "@/types/icons";
import React from "react";
import { SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  name: SVGIconNames;
  width?: number;
  height?: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const SVGIcon: React.FC<Props> = ({
  name,
  width = 24,
  height = 24,
  size,
  color = colors.black,
  strokeWidth = 0.1,
  ...rest
}) => {
  const IconComponent = SVGIcons[name].default;

  return (
    <IconComponent
      {...rest}
      width={size ?? width}
      height={size ?? height}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
};
