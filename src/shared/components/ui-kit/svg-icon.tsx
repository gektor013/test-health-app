import React from "react";
import * as SVGIcons from "@/constants/icons";
import { SVGIconNames } from "@/types/icons";
import { colors } from "@/constants";

interface Props {
  name: SVGIconNames;
  width?: number;
  height?: number;
  color?: string;
}

export const SVGIcon: React.FC<Props> = ({
  name,
  width = 24,
  height = 24,
  color = colors.black,
}) => {
  const IconComponent = SVGIcons[name].default;

  return <IconComponent width={width} height={height} stroke={color} />;
};
