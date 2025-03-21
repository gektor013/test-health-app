import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { Control, Controller } from "react-hook-form"

import { colors } from "@/constants"
import { useTranslations } from "@/shared/hooks"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { ScheduleEmloyeeTime } from "@/types/employees/employees.type"
import { commonHelpers } from "@/utils/helpers/common"

const width = commonHelpers.getDimensionsParams().width - 32

interface Props {
  control: Control<AppointmentCreateSchemaData>
  data: { scheduleData: ScheduleEmloyeeTime[] | undefined; isLoading: boolean }
}

export const ChooseTime = ({ data, control }: Props) => {
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
          <Controller
            name="choosenTime"
            control={control}
            key={`${t.startTime}-${i}`}
            render={({ field: { onChange, value } }) => (
              <Pressable
                onPress={() => onChange(t)}
                style={[
                  styles.time,
                  value.startTime === t.startTime && styles.timeActive
                ]}
              >
                <Text style={[value.startTime === t.startTime && styles.timeActive]}>
                  {t.startTime}-{t.endTime}
                </Text>
              </Pressable>
            )}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width
  },
  title: {
    fontWeight: "600",
    lineHeight: 17
  },
  timeContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6
  },
  time: {
    flexBasis: "30%",
    maxWidth: "32%",
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 8
  },
  timeActive: {
    backgroundColor: colors.green,
    color: colors.white
  }
})

// const styles = StyleSheet.create({
//   container: {
//     gap: 16
//   },
//   title: { fontWeight: "600", lineHeight: 17 },
//   timeContainer: {
//     flex: 1,
//     gap: 6,
//     flexWrap: "wrap",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     maxWidth: width
//   },
//   time: {
//     flexShrink: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderWidth: 1,
//     borderColor: colors.green,
//     borderRadius: 8
//     // maxWidth: 109
//   },
//   timeActive: {
//     backgroundColor: colors.green,
//     color: colors.white
//   }
// })
