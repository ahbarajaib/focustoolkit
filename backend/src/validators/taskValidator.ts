import { body, ValidationChain } from 'express-validator';

export const taskValidator: ValidationChain[] = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),

    body('dueDate')
        .optional()
        .isISO8601().withMessage('Due date must be a valid date'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high']).withMessage('Priority must be one of: low, medium, high')
];