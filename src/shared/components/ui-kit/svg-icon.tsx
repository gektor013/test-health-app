import React from "react";
import * as SVGIcons from "@/constants/icons";
import { SVGIconNames } from "@/types/icons";
import { colors } from "@/constants";

interface Props {
  name: SVGIconNames;
  width?: number;
  height?: number;
  size?: number;
  color?: string;
}

export const SVGIcon: React.FC<Props> = ({
  name,
  width = 24,
  height = 24,
  size,
  color = colors.black,
}) => {
  const IconComponent = SVGIcons[name].default;

  return (
    <IconComponent
      width={size ?? width}
      height={size ?? height}
      stroke={color}
    />
  );
};
