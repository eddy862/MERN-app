import { Request, Response } from "express";
const { matchedData } = require("express-validator");
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { comparePassword, hashedPassword } from "../utils/helpers";

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

    const findUser2 = await User.findOne({ email });

    if (findUser2) {
      return res
        .status(400)
        .json({ error: true, msg: "Email address already exists." });
    }

    const newUser = new User({ username, email, password });

    newUser.password = await hashedPassword(newUser.password);

    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: "1h" });

    return res
      .status(201)
      .json({ error: false, user: { username, email }, token });
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
    const user = await User.findOne(
      {
        $or: [{ username }, { email }],
      }
    );

    if (!user) {
      return res
        .status(400)
        .json({ error: true, msg: "Either email or username doesn't exist" });
    }

    if (!(await comparePassword(password, user.password))) {
      return res.status(400).json({ error: true, msg: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });

    const {password: _, ...userWithoutPwd} = user.toObject();

    return res.status(200).json({ error: false, user: userWithoutPwd, token });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err });
  }
};
