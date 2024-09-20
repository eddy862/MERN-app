const { body, param, query } = require("express-validator");

export const getBudgetsValidator = [
  query("category")
    .optional()
    .isMongoId()
    .withMessage("Category ID is invalid"),
  query("period")
    .optional()
    .isIn(["monthly", "yearly", "customised"])
    .withMessage('Period must be "monthly", "yearly or "customised"'),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),
];

export const addBudgetValidator = [
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("category").isMongoId().withMessage("Category ID is invalid"),
  body("period")
    .isIn(["monthly", "yearly", "customised"])
    .withMessage('Period must be "monthly", "yearly or "customised"'),
  body("startDate").isISO8601().withMessage("Start date must be a valid date"),
  body("endDate").isISO8601().withMessage("End date must be a valid date"),
];

export const updateBudgetValidator = [
  body("amount").optional().isNumeric().withMessage("Amount must be a number"),
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  body("period")
    .optional()
    .isIn(["monthly", "yearly", "customised"])
    .withMessage('Period must be "monthly", "yearly or "customised"'),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),
  param("budgetId").isMongoId().withMessage("Budget ID is invalid"),
];

export const deleteBudgetValidator = [
  param("budgetId").isMongoId().withMessage("Budget ID is invalid"),
];
