import { Router } from "express";
import { getParentCategories } from "../controllers/parentCategory.controller";
import { getParentCategoryValidator } from "../validators/parentCategoryValidator";
import { checkValidationResult } from "../middlewares/checkValidation";

const router = Router();

router.get(
  "/",
  getParentCategoryValidator,
  checkValidationResult,
  getParentCategories
);

export default router;
