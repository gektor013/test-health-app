import React from "react";
import { Text as BaseText, type TextProps, StyleSheet } from "react-native";
import { colors } from "@/constants";

interface Props extends TextProps {
  type?: "text" | "link";
}

export const Text: React.FC<Props> = ({ type = "text", style, ...rest }) => {
  return (
    <BaseText
      style={[
        styles.text,
        { color: type === "link" ? colors.green : colors.black },
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
