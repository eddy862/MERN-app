import { NextFunction, Request, Response } from "express";
const {validationResult} = require('express-validator')

export const checkValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, msg: errors.array() });
  }
  next();
};
