import { Router } from "express";
import { checkValidationResult } from "../middlewares/checkValidation";
import { addTransactionValidator, deleteTransactionValidator, getTransactionValidator, updateTransactionValidator } from "../validators/transactionValidator";
import { addNewTransaction, deleteTransaction, getAllTransaction, updateTransaction } from "../controllers/transaction.controller";

const router = Router();

router.get("/", getTransactionValidator, checkValidationResult, getAllTransaction);
router.post("/", addTransactionValidator, checkValidationResult, addNewTransaction);
router.patch("/:transactionId", updateTransactionValidator, checkValidationResult, updateTransaction); 
router.delete("/:transactionId", deleteTransactionValidator, checkValidationResult, deleteTransaction);

export default router;