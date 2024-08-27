import express from "express";
import { checkValidationResult } from "../middlewares/checkValidation";
import { addFixedItemValidator, deleteFixedItemValidator, updateFixedItemValidator } from "../validators/fixedItemValidator";
import { addFixedItem, deleteFixedItem, getFixedItems, updateFixedItem } from "../controllers/fixedItem.controller";

const router = express.Router();

router.get("/", getFixedItems);
router.post(
  "/",
  addFixedItemValidator,
  checkValidationResult,
  addFixedItem
);
router.patch(
  "/:fixedItemId",
  updateFixedItemValidator,
  checkValidationResult,
  updateFixedItem
);
router.delete(
  "/:fixedItemId",
  deleteFixedItemValidator,
  checkValidationResult,
  deleteFixedItem
);

export default router;
