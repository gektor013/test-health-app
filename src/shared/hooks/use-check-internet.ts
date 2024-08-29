import { useEffect } from "react"
import { router } from "expo-router"

import NetInfo from "@react-native-community/netinfo"

export const useCheckInternet = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        router.replace("/no-connection")
      }
    })

    return () => unsubscribe()
  }, [router])
}
