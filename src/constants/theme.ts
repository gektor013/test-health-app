import { Theme } from "@react-navigation/native";

export const colors = {
  white: "#ffffff",
  black: "#000000",
  soft_black: "#282828",
  dark_green: "#20943F",
  green: "#34A853",
  light_green: "#97D890",
  gray: "#BEBEBE",
  light_gray: "#F0F0F0",
  dark_gray: "#7A807B",
  disabled: "#BAC4BD",
  red: "#FF0000",
};

export const appTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.black,
    background: colors.white,
    card: colors.white,
    text: colors.black,
    border: colors.white,
    notification: colors.green,
  },
};
