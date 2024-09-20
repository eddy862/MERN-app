import { Router } from "express";
import { addBudget, deleteBudget, getAllBudgets, updateBudget } from "../controllers/budget.controller";
import { checkValidationResult } from "../middlewares/checkValidation";
import { addBudgetValidator, deleteBudgetValidator, getBudgetsValidator, updateBudgetValidator } from "../validators/budgetValidator";

const router = Router();

router.get("/", getBudgetsValidator, checkValidationResult, getAllBudgets);
router.post("/", addBudgetValidator, checkValidationResult, addBudget);
router.patch("/:budgetId", updateBudgetValidator, checkValidationResult, updateBudget);
router.delete("/:budgetId", deleteBudgetValidator, checkValidationResult, deleteBudget);

export default router;