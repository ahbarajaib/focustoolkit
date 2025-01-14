import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ModalHeader from "@/components/ModalHeader";

export default function AddNewTimeBlock() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [color, setColor] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatTime = (date: any) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const onChangeStartTime = (event: any, selectedDate: any) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartTime(selectedDate);
    }
  };

  const onChangeEndTime = (event: any, selectedDate: any) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndTime(selectedDate);
    }
  };

  const handleAddBlock = async () => {
    if (!title || !color) {
      alert("Please fill in all fields.");
      return;
    }

    const newTimeBlock = {
      userId: user?.id, // Ensure this is the correct user ID
      title,
      startTime: startTime.toISOString(), // Convert to ISO format
      endTime: endTime.toISOString(), // Convert to ISO format
      color,
      isRecurring: false,
      recurrencePattern: null,
      alertBefore: null,
      isCompleted: false,
      date: startTime.toISOString().split("T")[0], // Extract date in YYYY-MM-DD format
    };

    try {
      const response = await axios.post(
        "http://localhost:6001/api/timeblock",
        newTimeBlock
      );
      console.log("Time block created successfully:", response.data);
      router.back();
    } catch (error) {
      console.error("Error creating time block:", error);
      alert("Failed to create time block. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ModalHeader
        title="Add New Time Block"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />

        <Text style={styles.label}>Start Time</Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.timeButtonText}>{formatTime(startTime)}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={onChangeStartTime}
            textColor={colors.BLACK}
          />
        )}

        <Text style={styles.label}>End Time</Text>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.timeButtonText}>{formatTime(endTime)}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={onChangeEndTime}
            textColor={colors.BLACK}
          />
        )}

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
          placeholder="Enter color"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBlock}>
          <Text style={styles.addButtonText}>Add Time Block</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: colors.BLACK,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.WHITE,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: colors.WHITE,
  },
  timeButtonText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  addButton: {
    backgroundColor: colors.PRIMARY1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});
