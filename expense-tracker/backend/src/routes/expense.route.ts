import { Router } from "express";
import { addExpenseValidator, deleteExpenseValidator, getExpensesValidator, updateExpenseValidator } from "../validators/expenseValidator";
import { checkValidationResult } from "../middlewares/checkValidation";
import { addNewExpense, deleteExpense, getAllExpenses, updateExpense } from "../controllers/expense.controller";

const router = Router();

router.get("/", getExpensesValidator, checkValidationResult, getAllExpenses);
router.post("/", addExpenseValidator, checkValidationResult, addNewExpense);
router.patch("/:expenseId", updateExpenseValidator, checkValidationResult, updateExpense); 
router.delete("/:expenseId", deleteExpenseValidator, checkValidationResult, deleteExpense);

export default router;