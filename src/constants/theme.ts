import { Theme } from "@react-navigation/native";

export const colors = {
  white: "#ffffff",
  black: "#000000",
  dark_green: "#20943F",
  green: "#34A853",
  light_green: "#97D890",
  gray: "#BEBEBE",
  disabled: "#BAC4BD",
};

export const appTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.dark_green,
    background: colors.white,
    card: colors.white,
    text: colors.black,
    border: colors.green,
    notification: colors.green,
  },
};
