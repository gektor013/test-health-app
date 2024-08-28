import { useAuth } from "@/shared/hooks"
import { Redirect, usePathname } from "expo-router"

const Index = () => {
  const { isAuthenticated } = useAuth()
  const path = usePathname()

  return (
    <Redirect
      href={isAuthenticated && path !== "/auth/complete-profile" ? "/tabs" : "/welcome"}
    />
  )
}
export default Index
