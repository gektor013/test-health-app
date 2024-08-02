import { colors } from "@/constants";
import { ScreenContainer, SVGIcon } from "@/shared/components";
import { useAuth } from "@/shared/hooks";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { router, Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CentralTabButton = (props: BottomTabBarButtonProps) => (
  <Pressable style={styles.centralButton} onPress={props.onPress}>
    <View style={styles.centralIconContainer}>{props.children}</View>
  </Pressable>
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <ScreenContainer style={styles.screenContainer}>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.dark_gray,

          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.light_gray,
            marginHorizontal: -16,
            borderRadius: 20,

            height: insets.bottom + 56,
            borderTopWidth: 0.5,
            position: "relative",
            display: pathname === "/tabs/appointement-create" ? "none" : "flex",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <SVGIcon name="home" color={focused ? colors.green : colors.dark_gray} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: "Appointment",
            tabBarIcon: ({ focused }) => (
              <SVGIcon name="calendar" color={focused ? colors.green : colors.dark_gray} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointement-create"
          options={{
            headerShown: true,
            tabBarLabelStyle: { display: "none" },
            headerLeft: () => (
              <SVGIcon
                onPress={() => router.back()}
                name="arrow_back_ios_new"
                color={colors.dark_gray}
              />
            ),

            tabBarButton: (props) => <CentralTabButton {...props} />,
            tabBarIcon: () => <SVGIcon name="calendar_new" color={colors.white} />,
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            title: "Video",
            tabBarIcon: ({ focused }) => (
              <SVGIcon name="video" color={focused ? colors.green : colors.dark_gray} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <SVGIcon name="profile" color={focused ? colors.green : colors.dark_gray} />
            ),
          }}
        />
      </Tabs>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  centralButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  centralIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    // elevation: 5,
  },
});
