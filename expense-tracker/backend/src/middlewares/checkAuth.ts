import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../models/user.model";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error | null, user: IUser, info: any) => {
        if (err) {
          return res.status(500).json({ error: true, msg: "Server error" });
        }

        if (info && info.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ error: true, msg: "Token has expired" });
        }

        if (!user) {
          return res.status(401).json({ error: true, msg: "Unauthorized" });
        }

        req.user = user; 
        next();
      }
    )(req, res, next);
  } else if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ error: true, msg: "Unauthorized" });
  }
};
