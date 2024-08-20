import { Router } from "express";

const router = Router();

router.get("/");
router.post("/");
router.patch("/:budgetId");
router.delete("/:budgetId");

export default router;