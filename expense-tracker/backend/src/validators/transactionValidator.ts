const { body, param, query } = require("express-validator");

export const getTransactionValidator = [
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
  query("type")
    .optional()
    .isIn(["expense", "income"])
    .withMessage("Type must be either expense or income"),
  query("groupByDate")
    .optional()
    .isBoolean()
    .withMessage("Group by date must be a boolean"),
];

export const addTransactionValidator = [
  body("amount").isNumeric().withMessage("Amount is required"),
  body("type")
    .isIn(["expense", "income"])
    .withMessage("Type must be either expense or income"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string if provided"),
  body("category").isMongoId().withMessage("Category ID is invalid"),
  body("date").optional().isISO8601().toDate().withMessage("Date is invalid"),
];

export const updateTransactionValidator = [
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
  param("transactionId").isMongoId().withMessage("Transaction ID is invalid"),
];

export const deleteTransactionValidator = [
  param("transactionId").isMongoId().withMessage("Transaction ID is invalid"),
];
