import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Header, SearchInput, SVGIcon } from "@/shared/components";
import { UpcomingAppointment } from "./components/upcoming-appointment";
import { colors } from "@/constants";
import { Link } from "expo-router";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SearchInput />
      <UpcomingAppointment />
      <Link href={"/(app)/appointment/create"} style={styles.buttonContainer}>
        <View style={styles.button}>
          <SVGIcon name="calendar_new" color={colors.white} />
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    gap: 24,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: colors.green,

    justifyContent: "center",
    alignItems: "center",
  },
});
