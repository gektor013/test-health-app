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
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={[{ flex: 1 }, style]}
    {...restProps}
  />
);
