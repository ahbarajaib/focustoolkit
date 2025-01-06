import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import colors from "@/constants/Colors";
import Header from "@/components/Header";
import InitialTimeBlock from "@/components/InitialTImeBlock";

export default function HomeScreen() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) {
    return <Redirect href={"/login/signIn"} />;
  }

  return (
    <View style={styles.container}>
      <Header userName={user.name} />
      <InitialTimeBlock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: colors.WHITE,
    height: "100%",
  },
});
