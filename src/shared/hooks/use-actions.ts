import { useMemo } from "react"

import { useAppDispatch } from "@/redux"
import { logIn, logOut } from "@/redux/features"
import { bindActionCreators } from "@reduxjs/toolkit"

const rootActions = {
  logIn,
  logOut
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
