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
        topInset={insets.top}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        snapPoints={initialSnapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.white }}
        handleIndicatorStyle={{ backgroundColor: colors.black, width: 70 }}
        handleStyle={{
          height: 50,
          overflow: "visible",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50
        }}
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 50
        }}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 50
          }}
        >
          {props.children}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  )
})

export default CustomBottomSheet
