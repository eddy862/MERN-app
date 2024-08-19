const { body } = require("express-validator");

export const registerValidator = [
  body("username")
    .isString()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),
];

export const loginValidator = [
  body("username")
    .optional()
    .isString()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
