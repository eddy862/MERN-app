import { Router } from "express";
import { addCategoryValidator } from "../validators/categoryValidator";
import { checkValidationResult } from "../middlewares/checkValidation";
import { addCategory, getAllCategories } from "../controllers/category.controller";

const router = Router();

router.get("/", getAllCategories);
router.post("/", addCategoryValidator, checkValidationResult, addCategory);

export default router;