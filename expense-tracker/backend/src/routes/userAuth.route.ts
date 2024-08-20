import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/userAuthValidator";
import { checkValidationResult } from "../middlewares/checkValidation";
import { loginUser, registerUser } from "../controllers/userAuth.controller";
import { refreshToken } from "../controllers/refreshToken.controller";

const router = Router();

router.post('/login', loginValidator, checkValidationResult, loginUser)
router.post('/register', registerValidator, checkValidationResult, registerUser),
router.post('/refresh-token', refreshToken)

export default router;