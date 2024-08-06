import { Dimensions } from "react-native";

export const commonHelpers = {
  getDimensionsParams: () => {
    return {
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
    };
  },
};
