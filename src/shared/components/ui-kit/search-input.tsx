import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import { SVGIcon } from "./svg-icon";
import { colors } from "@/constants";
import { useTranslations } from "@/shared/hooks";

export const SearchInput: React.FC<TextInputProps> = ({
  style,
  ...restProps
}) => {
  const { t } = useTranslations();

  return (
    <View style={styles.container}>
      <SVGIcon name="search" color={colors.soft_black} />
      <TextInput
        style={[styles.input, style]}
        placeholder={t("Search by therapist, specialities")}
        placeholderTextColor={colors.dark_gray}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.light_gray,
  },
  input: {
    flexGrow: 1,
    fontSize: 14,
  },
});
