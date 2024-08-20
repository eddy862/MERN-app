import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const jwtSecret = process.env.JWT_SECRET_KEY;

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ error: true, msg: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, jwtSecret as string) as {
      id: string;
    };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ error: true, msg: "Invalid refresh token" });
    }

    const newToken = jwt.sign({ id: user.id }, jwtSecret as string, {
      expiresIn: "1h",
    });

    return res.status(200).json({ error: false, token: newToken });
  } catch (err) {
    return res
      .status(401)
      .json({ error: true, msg: "Invalid or expired refresh token" });
  }
};
