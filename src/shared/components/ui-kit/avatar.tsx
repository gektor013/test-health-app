import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@/constants";

interface Props {
  name?: string;
  size?: number;
}

export const Avatar: React.FC<Props> = ({ name, size = 30 }) => {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: colors.gray,
  },
});
