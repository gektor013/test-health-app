import {
  KeyboardAvoidingViewProps,
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView
} from "react-native"

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  style,
  ...restProps
}) => (
  <RNKeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={[{ flex: 1 }, style]}
    {...restProps}
  />
)
