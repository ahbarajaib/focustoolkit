import React, { useEffect } from "react";
import { Redirect, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

import { useAuth } from "@/context/AuthContext";

export default function TabLayout() {
  const { user } = useAuth();

  const router = useRouter();

  if (!user) {
    return <Redirect href="/login/signIn" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="schedule" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: "Add New",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="user" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
