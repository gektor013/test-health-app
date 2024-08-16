import { colors } from "@/constants"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    gap: 16
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16
  },
  avatarContainer: {
    position: "relative"
  },
  editIcon: {
    position: "absolute",
    right: 1,
    bottom: 5
  },
  name: {
    fontSize: 19,
    lineHeight: 23
  },
  scrollContainer: {
    flex: 1
  },
  buttonsContainer: {
    gap: 8,
    marginBottom: 50
  },
  btnContainer: {
    backgroundColor: colors.light_gray,
    borderColor: colors.light_gray,
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  btnTitle: {
    color: colors.black
  },
  logoutBtnContainer: {
    backgroundColor: "#F2FDFC",
    marginTop: 8
  },
  bottomSheetContainer: {
    gap: 24
  },
  bottomSheetHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16
  },
  bottomSheetTitle: {
    fontSize: 17,
    lineHeight: 21
  },
  bottomSheetDivider: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    width: "100%"
  },
  bottomSheetButtonsContainer: {
    gap: 16
  },
  bottomSheetCancelBtnContainer: {
    borderColor: colors.red
  },
  bottomSheetCancelBtnTitle: {
    color: colors.red
  }
})
