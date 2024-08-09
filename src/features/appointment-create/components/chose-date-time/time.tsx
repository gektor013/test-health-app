import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { useTranslations } from "@/shared/hooks"
import { ScheduleEmloyeeTime } from "@/types/employees/employees.type"
import { commonHelpers } from "@/utils/helpers/common"

const width = commonHelpers.getDimensionsParams().width - 32

interface Props {
  data: { scheduleData: ScheduleEmloyeeTime[] | undefined; isLoading: boolean }
}

export const ChooseTime = ({ data }: Props) => {
  const { t } = useTranslations()

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={[styles.title, { position: "relative" }]}>{t("Choose time")}</Text>
        <ActivityIndicator
          color={colors.green}
          size="small"
          style={{
            position: "absolute",
            left: 90,
            bottom: 0,
            display: data?.isLoading ? "flex" : "none"
          }}
        />
      </View>
      <View style={styles.timeContainer}>
        {data?.scheduleData?.map((t, i) => (
          <Pressable
            key={`${t.startTime}-${i}`}
            style={[styles.time, i === 1 && styles.timeActive]}
          >
            <Text style={[i === 1 && styles.timeActive]}>
              {t.startTime}-{t.endTime}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  title: { fontWeight: "600", lineHeight: 17 },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    flex: 1,
    justifyContent: "space-between",
    maxWidth: width
  },
  time: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8
    // maxWidth: 109
  },
  timeActive: {
    backgroundColor: colors.green,
    color: colors.white
  }
})
