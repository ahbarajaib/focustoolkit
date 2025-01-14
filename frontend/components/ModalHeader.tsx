import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "@/constants/Colors";

interface ModalHeaderProps {
  title: string;
  onBackPress: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.WHITE,
    elevation: 2, // Add shadow for Android
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: colors.PRIMARY1,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.BLACK,
  },
});

export default ModalHeader;
