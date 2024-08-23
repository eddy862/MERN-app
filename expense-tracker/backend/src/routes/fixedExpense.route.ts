import express from "express";
import {
  addFixedExpenseValidator,
  deleteFixedExpenseValidator,
  updateFixedExpenseValidator,
} from "../validators/fixedExpenseValidator";
import { checkValidationResult } from "../middlewares/checkValidation";
import {
  addFixedExpense,
  deleteFixedExpense,
  getFixedExpenses,
  updateFixedExpense,
} from "../controllers/fixedExpense.controller";

const router = express.Router();

router.get("/", getFixedExpenses);
router.post(
  "/",
  addFixedExpenseValidator,
  checkValidationResult,
  addFixedExpense
);
router.patch(
  "/:fixedExpenseId",
  updateFixedExpenseValidator,
  checkValidationResult,
  updateFixedExpense
);
router.delete(
  "/:fixedExpenseId",
  deleteFixedExpenseValidator,
  checkValidationResult,
  deleteFixedExpense
);

export default router;
