import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { router } from "expo-router"

import { colors } from "@/constants"
import { Button, SVGIcon } from "@/shared/components"
import { AppointmentCreateSchemaData } from "@/types/appointment/appointment.types"
import { dateHelper } from "@/utils/helpers/date"

interface Props {
  isVisible: boolean
  visitData: AppointmentCreateSchemaData | undefined
  onClose: () => void
  onViewAppointment: () => void
}

export const AppointmentCreateModals = ({
  visitData,
  isVisible,
  onClose,
  onViewAppointment
}: Props) => {
  const onGoHome = () => {
    onClose()
    router.push("/")
  }

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onDismiss={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {/* LOGO */}

          <SVGIcon name="success_appointment" size={80} />

          {/* TITLE */}

          <View style={styles.title}>
            <Text style={{ fontSize: 25, lineHeight: 30 }}>Successful!</Text>
            <Text style={styles.subtitle}>
              {
                "You have successfully made an appointment. You will receive a notification with the appointment confirmation!"
              }
            </Text>
          </View>

          {/* APPOINTEMNT INFO */}

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <View style={styles.infoItemRow}>
                <SVGIcon name="user" size={18} />
                <Text style={{ fontWeight: "600" }}>{visitData?.employee.name}</Text>
              </View>
              <View style={styles.infoItemRow}>
                <SVGIcon name="calendar" size={18} color={colors.green} />
                <Text style={{ fontWeight: "600" }}>
                  {visitData?.startedAt &&
                    dateHelper.formatedData(visitData?.startedAt, "DD.MM.YYYY")}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoItemRow}>
                <SVGIcon name="location" size={18} />
                <Text style={{ fontWeight: "600" }}>Room {visitData?.cabinet.name}</Text>
              </View>
              <View style={styles.infoItemRow}>
                <SVGIcon name="clock" size={18} color={colors.green} />
                <Text style={{ fontWeight: "600" }}>
                  {visitData?.startedAt &&
                    dateHelper.formatedData(visitData?.startedAt, "HH:mm")}
                </Text>
              </View>
            </View>
          </View>

          {/* BTNS */}

          <View style={styles.buttons}>
            <Button
              title="View Appointment"
              onPress={onViewAppointment}
              variant="primary"
              containerStyles={styles.button}
            />

            <Pressable onPress={onGoHome}>
              <Text>Go to Home</Text>
              <View style={styles.divider} />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    gap: 8
  },
  content: {
    backgroundColor: colors.white,
    paddingVertical: 32,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 32
  },
  title: {
    gap: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 17
  },
  info: {
    gap: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  infoItem: {
    gap: 16,
    flexDirection: "column"
  },
  infoItemRow: {
    flexDirection: "row",
    gap: 3
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    gap: 16
  },
  button: {
    width: "100%"
  },
  divider: {
    height: 1,
    backgroundColor: colors.black
  }
})
