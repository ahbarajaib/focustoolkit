import { Router } from "express";
import {
  getTimeBlocksByDate,
  createTimeBlock,
} from "../controllers/timeBlockController.ts";

const router = Router();

// // Get all tasks
// router.get('/', getTasks);

// // Get a single task by ID
// router.get('/:id', getTaskById);

// Create a new task
router.post("/", createTimeBlock);

// // Update an existing task
// router.put('/:id', updateTask);

// // Delete a task
// router.delete('/:id', deleteTask);

// New route to get time blocks by date
router.get("/:date", getTimeBlocksByDate);

export default router;
