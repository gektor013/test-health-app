import { StyleSheet, View } from "react-native"
import { Link } from "expo-router"

import { useGetVisitsQuery } from "@/redux/services/visit-api"
import { Text } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"

export const UpcomingAppointment = () => {
  //   const { data: visits } = useGetVisitsQuery();
  //   console.log({ visits });

  const { t } = useTranslations()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("Upcoming appointment")}</Text>
        <Link href="/(app)/tabs/appointment" style={styles.link}>
          <Text type="link">{t("See all")}</Text>
        </Link>
      </View>
      {/* <AppointmentCarousel /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontWeight: "600"
  },
  link: {}
})
