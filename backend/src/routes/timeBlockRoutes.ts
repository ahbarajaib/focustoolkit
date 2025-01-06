import { Router } from 'express';
import { createTimeBlock } from '../controllers/timeblockController.ts';

const router = Router();

// // Get all tasks
// router.get('/', getTasks);

// // Get a single task by ID
// router.get('/:id', getTaskById);

// Create a new task
router.post('/', createTimeBlock);

// // Update an existing task
// router.put('/:id', updateTask);

// // Delete a task
// router.delete('/:id', deleteTask);

export default router;