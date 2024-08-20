import { Modal, StyleSheet, Text, View } from "react-native"

import { colors } from "@/constants"
import { Button, SVGIcon } from "@/shared/components"

interface Props {
  isVisible: boolean
  onClose: () => void
  onViewAppointment: () => void
}

export const AppointmentDetailModals = ({
  isVisible,
  onClose,
  onViewAppointment
}: Props) => {
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
            <Text style={{ fontSize: 25, lineHeight: 30 }}>Cancellation!</Text>
            <Text style={styles.subtitle}>
              Your appointment with Ronnie C. Torres{" "}
              <Text style={{ color: colors.red }}>was cancelled</Text> from June 4, at
              10:00
            </Text>
          </View>

          {/* APPOINTEMNT INFO */}

          {/* BTNS */}

          <View style={styles.buttons}>
            <Button
              title="Done"
              onPress={onViewAppointment}
              variant="primary"
              containerStyles={styles.button}
            />
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
