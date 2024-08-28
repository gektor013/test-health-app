import { colors } from "@/constants"
import { useGetFreeEmployeesQuery } from "@/redux/services/employee-api"
import { useGetAllServicesQuery } from "@/redux/services/service-api"
import { useGetPrivateVisitsQuery } from "@/redux/services/visit-api"
import { CustomTabBar, ScreenContainer, SVGIcon } from "@/shared/components"
import { useAuth } from "@/shared/hooks"
import { dateHelper } from "@/utils/helpers/date"
import { Redirect, router, Tabs } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import React, { useEffect } from "react"
import { StyleSheet } from "react-native"

SplashScreen.preventAutoHideAsync()

export default function TabLayout() {
  const { user } = useAuth()
  if (!user) return <Redirect href={"/auth/sign-in"} />

  const { isLoading: isLoadingEmployee } = useGetFreeEmployeesQuery({
    day: dateHelper.formatedData(new Date(), "YYYY-MM-DD"),
    page: 1,
    limit: 1
  })
  const { isLoading: isLoadingService } = useGetAllServicesQuery()
  const { isLoading: isLoadingVisit } = useGetPrivateVisitsQuery({
    status: "Pending",
    page: 1,
    limit: 3
  })

  useEffect(() => {
    if (isLoadingEmployee || isLoadingService || isLoadingVisit) return
    SplashScreen.hideAsync()
  }, [isLoadingEmployee, isLoadingService, isLoadingVisit])

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
