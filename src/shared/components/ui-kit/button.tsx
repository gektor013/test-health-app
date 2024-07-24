import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./text";
import { colors } from "@/constants";
import { SVGIcon } from "./svg-icon";
import { SVGIconNames } from "@/types/icons";
import { useMemo } from "react";

interface Props extends PressableProps {
  variant?: "primary" | "secondary" | "outline" | "round" | "navigation";
  containerStyles?: ViewStyle;
  title: string;
  icon?: SVGIconNames;
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  containerStyles,
  title,
  icon,
  disabled,
  children,
  ...rest
}) => {
  const iconShow = useMemo(() => {
    return icon ? true : false;
  }, []);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        containerColorStyles[variant],
        containerStyles,
      ]}
      disabled={disabled}
      {...rest}
    >
      {iconShow && <SVGIcon name={icon!} color={colors.white} />}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
  text: {
    color: colors.white,
  },
});

const containerColorStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.dark_green,
    borderColor: colors.dark_green,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  outline: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  round: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  navigation: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
});
