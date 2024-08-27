const { body, param } = require("express-validator");

export const addFixedItemValidator = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .notEmpty()
    .withMessage("Amount is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("category").isMongoId().withMessage("Category ID is invalid"),
  body("type").isIn(["expense", "income"]).withMessage("Type must be either 'expense' or 'income"),
  body("startDate")
    .isDate()
    .withMessage("Start date must be a valid date")
    .notEmpty()
    .withMessage("Start date is required"),
  body("frequency")
    .custom((value: any) => {
      return (
        (typeof value === "number" && value >= 1 && value <= 36) || value === "unlimited"
      );
    })
    .withMessage('Frequency must be a number between 1 and 36 or "unlimited"'),
  body("period")
    .isString()
    .withMessage("Period must be a string")
    .notEmpty()
    .withMessage("Period is required")
    .isIn(["weekly", "monthly"])
    .withMessage("Period must be either 'weekly' or 'monthly'"),
  body("daysOfWeek")
    .optional()
    .isArray()
    .withMessage("Days of week must be an array")
    .custom((value: any) =>
      value.every(
        (num: number) => Number.isInteger(num) && num >= 0 && num <= 6
      )
    )
    .withMessage("Days of week must be an array of integers between 0 and 6"),
  body("daysOfMonth")
    .optional()
    .isArray()
    .withMessage("Days of month must be an array")
    .custom((value: any) =>
      value.every(
        (num: number) => Number.isInteger(num) && num >= 1 && num <= 31
      )
    )
    .withMessage("Days of month must be an array of integers between 1 and 31"),
];

export const updateFixedItemValidator = [
  body("amount").optional().isNumeric().withMessage("Amount must be a number"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("category").optional().isMongoId().withMessage("Category ID is invalid"),
  body("startDate")
    .optional()
    .isDate()
    .withMessage("Start date must be a valid date"),
  body("frequency")
    .optional()
    .custom((value: any) => {
      return (
        (typeof value === "number" && value >= 1 && value <= 36) || value === "unlimited"
      );
    })
    .withMessage('Frequency must be a number between 1 and 36 or "unlimited"'),
  body("period")
    .optional()
    .isString()
    .withMessage("Period must be a string")
    .isIn(["weekly", "monthly"])
    .withMessage("Period must be either 'weekly' or 'monthly'"),
  body("daysOfWeek")
    .optional()
    .isArray()
    .withMessage("Days of week must be an array")
    .custom((value: any) =>
      value.every(
        (num: number) => Number.isInteger(num) && num >= 0 && num <= 6
      )
    )
    .withMessage("Days of week must be an array of integers between 0 and 6"),
  body("daysOfMonth")
    .optional()
    .isArray()
    .withMessage("Days of month must be an array")
    .custom((value: any) =>
      value.every(
        (num: number) => Number.isInteger(num) && num >= 1 && num <= 31
      )
    )
    .withMessage("Days of month must be an array of integers between 1 and 31"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("Is active must be a boolean"),
  param("fixedItemId")
    .isMongoId()
    .withMessage("Fixed item ID is invalid"),
];

export const deleteFixedItemValidator = [
  param("fixedItemId")
    .isMongoId()
    .withMessage("Fixed item ID is invalid"),
];
