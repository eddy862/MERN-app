const {body} = require("express-validator");

export const addCategoryValidator = [
  body("name")
    .isString()
    .withMessage("Name is required"),
  body("icon")
    .isString()
    .withMessage("Icon is required"),
  body("parentCategory")
    .optional()
    .isString()
    .withMessage("Parent category must be a string if provided"),
];