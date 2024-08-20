import React from "react"
import { useForm } from "react-hook-form"

import { UserProfileForm } from "@/shared/components"

export const UserProfile = () => {
  const { control } = useForm()

  return <UserProfileForm control={control} />
}
