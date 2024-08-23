const { body, param } = require("express-validator");

export const addFixedExpenseValidator = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .notEmpty()
    .withMessage("Amount is required"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required"),
  body("category")
    .isMongoId()
    .withMessage("Category ID is invalid"),
  body("startDate")
    .isDate()
    .withMessage("Start date must be a valid date")
    .notEmpty()
    .withMessage("Start date is required"),
  body("frequency")
    .isNumeric()
    .withMessage("Frequency must be a number")
    .notEmpty()
    .withMessage("Frequency is required"),
  body("period")
    .isString()
    .withMessage("Period must be a string")
    .notEmpty()
    .withMessage("Period is required")
    .isIn(['weekly', 'monthly'])
    .withMessage("Period must be either 'weekly' or 'monthly'"),
  body("daysOfWeek")
    .optional()
    .isArray()
    .withMessage("Days of week must be an array")
    .custom((num: number) => Number.isInteger(num) && num >= 0 && num <= 6)
    .withMessage("Days of week must be an array of integers between 0 and 6"),
  body("daysOfMonth")
    .optional()
    .isArray()
    .withMessage("Days of month must be an array")
    .custom((num: number) => Number.isInteger(num) && num >= 1 && num <= 31)
    .withMessage("Days of month must be an array of integers between 1 and 31"),
];

export const updateFixedExpenseValidator = [
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Category ID is invalid"),
  body("startDate")
    .optional()
    .isDate()
    .withMessage("Start date must be a valid date"),
  body("frequency")
    .optional()
    .isNumeric()
    .withMessage("Frequency must be a number"),
  body("period")
    .optional()
    .isString()
    .withMessage("Period must be a string"),
  body("daysOfWeek")
    .optional()
    .isArray()
    .withMessage("Days of week must be an array")
    .custom((num: number) => Number.isInteger(num) && num >= 0 && num <= 6)
    .withMessage("Days of week must be an array of integers between 0 and 6"),
  body("daysOfMonth")
    .optional()
    .isArray()
    .withMessage("Days of month must be an array")
    .custom((num: number) => Number.isInteger(num) && num >= 1 && num <= 31)
    .withMessage("Days of month must be an array of integers between 1 and 31"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("Is active must be a boolean"),
  body("timesCreated")
    .optional()
    .isNumeric()
    .withMessage("Times created must be a number"),
  param("fixedExpenseId")
    .isMongoId()
    .withMessage("Fixed expense ID is invalid"),
];

export const deleteFixedExpenseValidator = [
  param("fixedExpenseId")
    .isMongoId()
    .withMessage("Fixed expense ID is invalid"),
];