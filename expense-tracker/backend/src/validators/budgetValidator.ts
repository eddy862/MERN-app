const { body, param } = require('express-validator');

export const addBudgetValidator = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('category').isMongoId().withMessage('Category ID is invalid'),
  body('period').isIn(['monthly', 'yearly']).withMessage('Period must be either "monthly" or "yearly'),
];

export const updateBudgetValidator = [
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('period').optional().isIn(['monthly', 'yearly']).withMessage('Period must be either "monthly" or "yearly'),
  param('budgetId').isMongoId().withMessage('Budget ID is invalid'),
]; 

export const deleteBudgetValidator = [
  param('budgetId').isMongoId().withMessage('Budget ID is invalid'),
];
