import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const user = await User.findById(userId);
    return res.status(200).json({ error: false, user });
  } catch {
    return res.status(500).json({ error: true, msg: "Error fetching user" });
  }
}
