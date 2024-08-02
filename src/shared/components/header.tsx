import { StyleSheet, View } from "react-native";
import { Avatar, SVGIcon, Text } from "./ui-kit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "@/constants";

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Avatar />
        <Text style={styles.greenText}>
          Hi, <Text style={styles.text}>Kevin Lablabce</Text>
        </Text>
      </View>
      <TouchableOpacity>
        <SVGIcon name="bell" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  greenText: {
    fontSize: 17,
    color: colors.green,
  },
  text: {
    fontSize: 17,
    color: colors.black,
  },
});
