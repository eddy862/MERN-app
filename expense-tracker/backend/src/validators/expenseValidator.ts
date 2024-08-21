const { body, param } = require("express-validator");

export const addExpenseValidator = [
  body("amount").isNumeric().withMessage("Amount is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string if provided"),
  body("category").isString().withMessage("Category is required"),
  body("date").isString().withMessage("Date is required"),
];

export const updateExpenseValidator = [
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Amount must be a number if provided"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string if provided"),
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string if provided"),
  body("date")
    .optional()
    .isString()
    .withMessage("Date must be a string if provided"),
  param("expenseId").isMongoId().withMessage("Expense ID is invalid"),
];

export const deleteExpenseValidator = [
  param("expenseId").isMongoId().withMessage("Expense ID is invalid"),
];
