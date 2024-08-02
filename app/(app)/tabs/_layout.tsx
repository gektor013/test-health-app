import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { ScreenContainer, SVGIcon } from "@/shared/components";
import { useAuth } from "@/shared/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
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
            height: insets.bottom + 56,
            borderTopWidth: 0.5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            // tabBarLabel: ({ focused }) => (
            //   <TabBarLabel title="Projects" focused={focused} />
            // ),
            tabBarIcon: ({ focused }) => (
              <SVGIcon
                name="home"
                color={focused ? colors.green : colors.dark_gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: "Appointment",
            // tabBarLabel: ({ focused }) => (
            //   <TabBarLabel title="Calendar" focused={focused} />
            // ),
            tabBarIcon: ({ focused }) => (
              <SVGIcon
                name="calendar"
                color={focused ? colors.green : colors.dark_gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            title: "Video",

            // tabBarLabel: ({ focused }) => (
            //   <TabBarLabel title="Employees" focused={focused} />
            // ),
            tabBarIcon: ({ focused }) => (
              <SVGIcon
                name="video"
                color={focused ? colors.green : colors.dark_gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",

            // tabBarLabel: ({ focused }) => (
            //   <TabBarLabel title="Clients" focused={focused} />
            // ),
            tabBarIcon: ({ focused }) => (
              <SVGIcon
                name="profile"
                color={focused ? colors.green : colors.dark_gray}
              />
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
});
