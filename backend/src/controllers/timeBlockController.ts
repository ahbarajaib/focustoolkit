import { Request, Response } from "express";
import TimeBlock from "../models/TimeBlockModel.js";
import { Types } from "mongoose";

const createTimeBlock = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      title,
      startTime,
      endTime,
      color,
      isRecurring,
      recurrencePattern,
      alertBefore,
      isCompleted,
      date,
    } = req.body;

    if (!userId || !title || !startTime || !endTime || !date) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      res.status(400).json({ message: "Start time must be before end time" });
      return;
    }

    const timeBlock = new TimeBlock({
      userId,
      title,
      startTime,
      endTime,
      color,
      isRecurring: isRecurring || false,
      recurrencePattern: recurrencePattern || null,
      alertBefore: alertBefore || null,
      isCompleted: isCompleted || false,
      date,
    });

    await timeBlock.save();
    res.status(201).json({
      message: "Time block created successfully",
      timeBlock,
    });
  } catch (error) {
    console.error("Error creating time block", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTimeBlocksByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.params;
    const timeBlocks = await TimeBlock.find({ date });
    res.status(200).json(timeBlocks);
  } catch (error) {
    console.error("Error fetching time blocks", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createTimeBlock, getTimeBlocksByDate };
