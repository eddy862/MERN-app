import { Request, Response } from "express";
const { matchedData } = require("express-validator");
import User, { ILocalUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { comparePassword, hashedPassword, isLocalUser } from "../utils/helpers";

const jwtSecret = process.env.JWT_SECRET_KEY;

if (!jwtSecret) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

export const registerUser = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const { username, email, password } = data;

  try {
    const findUser1 = await User.findOne({ username });

    if (findUser1) {
      return res
        .status(400)
        .json({ error: true, msg: "Username already exists." });
    }

    const findUser2 = await User.findOne({
      email,
      googleId: { $exists: false },
    });

    if (findUser2) {
      return res
        .status(400)
        .json({ error: true, msg: "Email address already exists." });
    }

    const newUser = new User({ username, email, password }) as ILocalUser;

    newUser.password = await hashedPassword(newUser.password);

    await newUser.save();

    const accessToken = jwt.sign({ id: newUser.id }, jwtSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: newUser.id }, jwtSecret, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      error: false,
      user: { username, email },
      token: accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const { username, email, password } = data;

  if (!username && !email) {
    return res
      .status(400)
      .json({ error: true, msg: "Either username or email must be provided" });
  }

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
      googleId: { $exists: false },
    });

    if (!user || !isLocalUser(user)) {
      return res
        .status(400)
        .json({ error: true, msg: "Either email or username doesn't exist" });
    }

    if (!(await comparePassword(password, user.password))) {
      return res.status(400).json({ error: true, msg: "Incorrect password" });
    }

    const accessToken = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: "7d",
    });

    const { password: _, ...userWithoutPwd } = user.toObject();

    return res.status(200).json({
      error: false,
      user: userWithoutPwd,
      token: accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const accessToken = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: "7d",
  });

  return res.redirect(`/googleCallback?token=${accessToken}&refreshToken=${refreshToken}`);
};
