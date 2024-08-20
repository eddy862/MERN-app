import { Router } from "express";

const router = Router();

router.get("/");
router.post("/");
router.patch("/:expenseId"); //update amount, date, category, desp
router.delete("/:expenseId");

export default router;