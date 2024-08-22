const { body, param, query } = require("express-validator");

export const getExpensesValidator = [
  query("startDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid start date"),
  query("endDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid end date"),
  query("category").optional().isMongoId().withMessage("Invalid category ID"),
  query("minAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum amount must be a positive number"),
  query("maxAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum amount must be a positive number"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be greater than 0"),
  query("isRecurring")
    .optional()
    .isBoolean()
    .withMessage("isRecurring must be a boolean"),
];

export const addExpenseValidator = [
  body("amount").isNumeric().withMessage("Amount is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string if provided"),
  body("category").isMongoId().withMessage("Category ID is invalid"),
  body("date").isISO8601().toDate().withMessage("Date is invalid"),
  body("recurrenceInterval")
    .optional()
    .isIn(["daily", "weekly", "monthly", "yearly"])
    .withMessage("Recurrence interval is invalid"),
  body("recurrenceEndDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Recurrence end date is invalid"),
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
    .isMongoId()
    .withMessage("Category ID must be valid if provided"),
  body("date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be valid if provided"),
  body("recurrenceInterval")
    .optional({ nullable: true })
    .isIn(["daily", "weekly", "monthly", "yearly"])
    .withMessage("Recurrence interval is invalid"),
  body("recurrenceEndDate")
    .optional({ nullable: true })
    .isISO8601()
    .toDate()
    .withMessage("Recurrence end date is invalid"),
  param("expenseId").isMongoId().withMessage("Expense ID is invalid"),
];

export const deleteExpenseValidator = [
  param("expenseId").isMongoId().withMessage("Expense ID is invalid"),
];
