import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import moment from "moment"; // Make sure to install moment.js

interface DateSliderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateSlider: React.FC<DateSliderProps> = ({
  selectedDate,
  onDateChange,
}) => {
  // Calculate the start of the week based on the selected date
  const startOfWeek = moment(selectedDate).startOf("isoWeek");
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.clone().add(i, "days")
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {daysOfWeek.map((day) => {
          const isSelected = day.format("YYYY-MM-DD") === selectedDate;

          return (
            <View key={day.format("YYYY-MM-DD")} style={styles.dayButton}>
              <Text style={styles.dayText}>{day.format("ddd")}</Text>
              <TouchableOpacity
                onPress={() => onDateChange(day.format("YYYY-MM-DD"))}
                style={[
                  styles.dateContainer,
                  isSelected && styles.selectedDateContainer,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {day.format("D")}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  dayButton: {
    padding: 10,
    alignItems: "center",
    width: 60,
  },
  dayText: {
    fontSize: 16,
    color: "#000", // Change color as needed
  },
  dateContainer: {
    width: 30,
    height: 30,
    borderRadius: 15, // Make it circular
    backgroundColor: "#e0e0e0", // Default background color for the date circle
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  selectedDateContainer: {
    backgroundColor: "#4A90E2", // Darker background color when selected
  },
  dateText: {
    fontSize: 14,
    color: "#000", // Default text color
  },
  selectedDateText: {
    color: "#FFF", // Light text color when selected
  },
});

export default DateSlider;
