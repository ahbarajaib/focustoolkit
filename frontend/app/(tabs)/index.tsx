import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import colors from "@/constants/Colors";
import Header from "@/components/Header";
import InitialTimeBlock from "@/components/InitialTImeBlock";
import DateSlider from "@/components/DateSlider";

export default function HomeScreen() {
  const { user, logout, isLoading } = useAuth();
  const [selectedDate, setSelectedDate] = useState("2025-01-09"); // Default to today

  if (isLoading) return null;
  if (!user) {
    return <Redirect href={"/login/signIn"} />;
  }

  return (
    <View style={styles.container}>
      <Header userName={user.name} />
      <DateSlider selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <InitialTimeBlock selectedDate={selectedDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.WHITE,
    height: "100%",
  },
});
