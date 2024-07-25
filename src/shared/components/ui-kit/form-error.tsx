import { StyleSheet, View } from "react-native";
import { Text } from "./text";
import { FieldError } from "react-hook-form";
import { colors } from "@/constants";

interface Props {
  error: FieldError | undefined;
}

export const FormError: React.FC<Props> = ({ error }) => {
  return error?.message ? (
    <View>
      <Text style={styles.text}>{error.message}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: colors.red,
  },
});
