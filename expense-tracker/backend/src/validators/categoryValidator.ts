const {body} = require("express-validator");

export const addCategoryValidator = [
  body("name")
    .isString()
    .withMessage("Name is required"),
  body("icon")
    .isString()
    .withMessage("Icon is required"),
  body("parentCategory")
    .isMongoId()
    .withMessage("Parent category ID is invalid"),
];