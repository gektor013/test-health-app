import { colors } from "@/constants";
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from "react-native";

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  keyboardVerticalOffset,
  style,
  ...restProps
}) => (
  <RNKeyboardAvoidingView
    {...restProps}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={[{ flex: 1 }, style]}
  />
);
