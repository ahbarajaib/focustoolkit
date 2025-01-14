import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import colors from "@/constants/Colors";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Image
          source={require("@/assets/images/app_ui.png")}
          style={styles?.image}
        />
      </View>
      <View
        style={{
          padding: 25,
          backgroundColor: colors?.PRIMARY1,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: colors?.WHITE,
            textAlign: "center",
          }}
        >
          Take control of your time.
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors?.WHITE,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Keep track of your schedule, time blocks for deep work.
        </Text>

        <TouchableOpacity
          style={styles?.button}
          onPress={() => router.push("/login/signIn")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: colors?.PRIMARY1,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: colors?.WHITE,
            marginTop: 4,
          }}
        >
          By clicking continue you will agree to our terms & conditions.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 450,
    borderRadius: 24,
  },
  button: {
    padding: 15,
    backgroundColor: colors?.WHITE,
    borderRadius: 99,
    marginTop: 25,
  },
});
