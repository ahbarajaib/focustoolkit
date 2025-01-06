import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import Colors from "@/constants/Colors.tsx";
const { width, height } = Dimensions.get("window");

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/smiley.png")}
            style={styles.image}
          />
          <Text style={styles.text}>Hi {userName}!</Text>
        </View>
        <AntDesign name="setting" size={36} color={Colors.GRAY} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? (height >= 812 ? 44 : 20) : 20, // Adjust padding for iPhone X and above
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
