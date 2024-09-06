const { body } = require("express-validator");

export const addCategoryValidator = [
  body("name")
    .isString()
    .isLength({ max: 20 })
    .withMessage("Name is required and cannot exceed 20 characters"),
  body("icon").isString().withMessage("Icon is required"),
  body("parentCategory")
    .isMongoId()
    .withMessage("Parent category ID is invalid"),
  body("type")
    .isString()
    .isIn(["income", "expense"])
    .withMessage("Type is required and must be either income or expense"),
];
