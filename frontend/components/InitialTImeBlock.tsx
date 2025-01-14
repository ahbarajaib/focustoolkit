import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

interface InitialTimeBlockProps {
  selectedDate: string;
}

const { width } = Dimensions.get("window");
const MIN_BLOCK_HEIGHT = 60;
const MAX_BLOCK_HEIGHT = 120;
const EMPTY_BLOCK_HEIGHT = 20;
const PIPE_WIDTH = 32;
const INDICATOR_SIZE = PIPE_WIDTH * 1;
const INNER_INDICATOR_SIZE = PIPE_WIDTH * 0.4;

// Dummy data with date property
const dummyTasks = [
  {
    id: 1,
    title: "Morning Workout",
    startTime: "06:30",
    endTime: "07:30",
    color: "#FF6B6B",
    date: "2025-01-09",
  },
  {
    id: 2,
    title: "Team Meeting",
    startTime: "14:00",
    endTime: "14:30",
    color: "#4ECDC4",
    date: "2025-01-09",
  },
  {
    id: 3,
    title: "Dinner",
    startTime: "21:00",
    endTime: "22:30",
    color: "#4edaaa",
    date: "2025-01-10",
  },
  {
    id: 4,
    title: "Eve Workout",
    startTime: "07:30",
    endTime: "08:00",
    color: "#FF6B3A",
    date: "2025-01-09",
  },
  {
    id: 5,
    title: "Just a test",
    startTime: "13:30",
    endTime: "14:30",
    color: "#FFa3AA",
    date: "2025-01-10",
  },
];

const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
};

const getTaskDuration = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const duration = endHour - startHour + (endMinute - startMinute) / 60;
  return duration;
};

const calculateBlockHeight = (duration: number) => {
  if (duration <= 0.5) return MIN_BLOCK_HEIGHT;
  if (duration <= 1) return MIN_BLOCK_HEIGHT * 1.3;
  if (duration <= 1.5) return MIN_BLOCK_HEIGHT * 1.6;
  if (duration <= 2) return MIN_BLOCK_HEIGHT * 1.8;
  return MAX_BLOCK_HEIGHT;
};

const getTaskProgress = (task: any, currentTime: any) => {
  const startHour = parseInt(task.startTime.split(":")[0]);
  const startMinute = parseInt(task.startTime.split(":")[1]);
  const endHour = parseInt(task.endTime.split(":")[0]);
  const endMinute = parseInt(task.endTime.split(":")[1]);

  const taskStart = startHour + startMinute / 60;
  const taskEnd = endHour + endMinute / 60;

  if (currentTime < taskStart) return 0;
  if (currentTime > taskEnd) return 100;

  return ((currentTime - taskStart) / (taskEnd - taskStart)) * 100;
};

const InitialTimeBlock: React.FC<InitialTimeBlockProps> = ({
  selectedDate,
}) => {
  const router = useRouter();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentTime = getCurrentTime();

  const handlePress = () => {
    console.log("Navigating to /addNewTimeBlock");
    router.push("/addNewTimeBlock");
  };

  // Filter tasks based on the selected date
  const filteredTasks = dummyTasks.filter((task) => task.date === selectedDate);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.timeline}>
          {hours.map((hour) => {
            const task = filteredTasks.find(
              (task) =>
                parseInt(task.startTime.split(":")[0]) <= hour &&
                parseInt(task.endTime.split(":")[0]) > hour
            );

            const blockHeight = task
              ? calculateBlockHeight(
                  getTaskDuration(task.startTime, task.endTime)
                )
              : EMPTY_BLOCK_HEIGHT;

            return (
              <View
                key={hour}
                style={[styles.hourContainer, { height: blockHeight }]}
              >
                <View style={styles.timeLabel}>
                  <Text style={styles.timeText}>
                    {hour.toString().padStart(2, "0")}:00
                  </Text>
                </View>
                {task ? (
                  <View style={[styles.pipe, { height: blockHeight }]}>
                    {currentTime > hour && (
                      <LinearGradient
                        colors={[task.color, task.color]}
                        style={[
                          styles.liquidIndicator,
                          { height: `${getTaskProgress(task, currentTime)}%` },
                        ]}
                      />
                    )}
                    {currentTime > hour && currentTime < hour + 1 && (
                      <View style={styles.currentTimeIndicator}>
                        <View style={styles.currentTimeInner} />
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={styles.dot}>
                    <Entypo name="dot-single" size={24} color="black" />
                  </View>
                )}
                {task && (
                  <View
                    style={[
                      styles.taskBlock,
                      {
                        backgroundColor: task.color,
                        height: blockHeight - 10, // Slight padding
                      },
                    ]}
                  >
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskTime}>
                      {task.startTime} - {task.endTime}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InitialTimeBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  timeline: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  hourContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  pipe: {
    width: PIPE_WIDTH,
    height: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: PIPE_WIDTH / 2,
    overflow: "hidden",
    position: "relative",
  },
  dot: {
    width: PIPE_WIDTH,
    alignItems: "center",
  },
  liquidIndicator: {
    width: PIPE_WIDTH,
    position: "absolute",
    top: 0,
  },
  currentTimeIndicator: {
    position: "absolute",
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    backgroundColor: colors.PRIMARY1,
    left: -(INDICATOR_SIZE - PIPE_WIDTH) / 2,
    top: "50%",
    transform: [{ translateY: -INDICATOR_SIZE / 2 }],
    borderRadius: INDICATOR_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
    zIndex: 2,
  },
  currentTimeInner: {
    width: INNER_INDICATOR_SIZE,
    height: INNER_INDICATOR_SIZE,
    backgroundColor: colors.WHITE,
    borderRadius: INNER_INDICATOR_SIZE / 2,
  },
  timeLabel: {
    width: 50,
    marginLeft: 12,
  },
  timeText: {
    fontSize: 12,
    color: colors.GRAY,
  },
  taskBlock: {
    flex: 1,
    marginLeft: 12,
    padding: 10,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  taskTime: {
    fontSize: 12,
    color: "#FFF",
    opacity: 0.8,
    marginTop: 4,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: colors.PRIMARY1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});
