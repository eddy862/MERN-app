import { Request, Response } from "express";
import Category from "../models/category.model";
import { IUser } from "../models/user.model";
const { matchedData } = require("express-validator");

export const addCategory = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { name, icon, parentCategory, type } = data;

  try {
    const newCategory = new Category({
      parentCategory,
      name,
      icon,
      user: userId,
      predefined: false,
      type,
    });

    await newCategory.save();

    return res.status(201).json({ error: false, category: newCategory });
  } catch {
    return res.status(500).json({ error: true, msg: "Error adding category" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const categories = await Category.find({
      $or: [{ user: userId }, { predefined: true }],
    });
    return res.status(200).json({ error: false, categories });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error fetching categories" });
  }
};
