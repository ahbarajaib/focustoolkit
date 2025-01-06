import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/constants/Colors";

export default function AddNewTimeBlock() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [color, setColor] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const onChangeStartTime = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartTime(selectedDate);
    }
  };

  const onChangeEndTime = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndTime(selectedDate);
    }
  };

  const handleAddBlock = () => {
    // Handle adding the new time block
  };

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.WHITE,
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
    backgroundColor: colors.PRIMARY,
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
