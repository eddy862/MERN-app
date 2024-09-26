import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/userAuthValidator";
import { checkValidationResult } from "../middlewares/checkValidation";
import { loginUser, registerUser } from "../controllers/userAuth.controller";
import { refreshToken } from "../controllers/refreshToken.controller";
import passport from "passport";
import { googleCallback } from "./../controllers/userAuth.controller";

const router = Router();

router.post("/login", loginValidator, checkValidationResult, loginUser);
router.post(
  "/register",
  registerValidator,
  checkValidationResult,
  registerUser
);

router.post("/refresh-token", refreshToken);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
