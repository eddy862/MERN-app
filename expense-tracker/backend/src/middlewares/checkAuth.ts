import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";

interface IUserPayload extends JwtPayload {
  _id: string;
  username: string;
  email: string
}

export interface IAuthenticatedRequest extends Request {
  user: IUserPayload
}

export const checkAuth = (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: IUser, info: any) => {
      if (err) {
        return res.status(500).json({ error: true, msg: "Server error" });
      }

      if (info && info.name === "TokenExpiredError") {
        return res.status(401).json({ error: true, msg: "Token has expired" });
      }

      if (!user) {
        return res.status(401).json({ error: true, msg: "Unauthorized" });
      }

      req.user = user as IUserPayload;
      next();
    }
  )(req, res, next);
};
