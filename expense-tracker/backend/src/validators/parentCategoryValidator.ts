const { query } = require("express-validator");

export const getParentCategoryValidator = [
  query("type")
    .optional()
    .isIn(["expense", "income"])
    .withMessage("Type must be either expense or income"),
];