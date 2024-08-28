import { colors } from "@/constants"
import { CustomTabBar, ScreenContainer, SVGIcon } from "@/shared/components"
import { useAuth } from "@/shared/hooks"
import { Redirect, router, Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet } from "react-native"

export default function TabLayout() {
  const { user } = useAuth()
  if (!user) return <Redirect href={"/auth/sign-in"} />

  return (
    <ScreenContainer style={styles.screenContainer}>
      <StatusBar style="dark" />
      <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            headerShown: true,
            title: "Appointments",
            headerStatusBarHeight: 0,
            headerTitleStyle: {
              fontWeight: "400"
            }
          }}
        />
        <Tabs.Screen
          name="appointement-create"
          options={{
            headerShown: false,
            tabBarLabelStyle: { display: "none" },
            title: "Book a new appointment",
            headerLeft: () => (
              <SVGIcon
                onPress={() => router.back()}
                name="arrow_back_ios_new"
                height={16}
                width={10}
              />
            ),

            tabBarStyle: { display: "none" }
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            headerShown: true,
            title: "Video",
            headerStatusBarHeight: 0,
            headerTitleStyle: {
              fontWeight: "400"
            }
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "Profile",
            headerStatusBarHeight: 0,
            headerTitleStyle: {
              fontWeight: "400"
            }
          }}
        />
      </Tabs>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 0
  },
  centralButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center"
  },
  centralIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center"
  }
})
