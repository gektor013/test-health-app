import { useMemo } from "react"

import { useAppDispatch } from "@/redux"
import {
  logIn,
  logOut,
  setToken,
  setUploadCountFiles,
  updateUserData
} from "@/redux/features"
import { bindActionCreators } from "@reduxjs/toolkit"

const rootActions = {
  logIn,
  logOut,
  setToken,
  updateUserData,
  setUploadCountFiles
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
