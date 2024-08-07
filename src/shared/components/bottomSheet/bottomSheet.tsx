import { forwardRef, useCallback, useMemo } from "react"
import { Portal } from "react-native-portalize"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { colors } from "@/constants"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"

export type Ref = BottomSheet

interface CustomBottomSheetProps {
  children?: JSX.Element
}

const CustomBottomSheet = forwardRef<Ref, CustomBottomSheetProps>((props, ref) => {
  const initialSnapPoints = useMemo(() => ["15%"], [])
  const insets = useSafeAreaInsets()

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ),
    []
  )

  return (
    <Portal>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={initialSnapPoints}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        topInset={insets.top}
        handleIndicatorStyle={{ backgroundColor: colors.gray }}
        backgroundStyle={{ backgroundColor: colors.white }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={{ paddingHorizontal: 20 }}>
          {props.children}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  )
})

export default CustomBottomSheet
