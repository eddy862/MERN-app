import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../middlewares/checkAuth";
import Category, { ICategory } from "../models/category.model";

export const addCategory = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const userId = req.user._id;
  //validation
  const { name, icon, parentCategory } = req.body;

  try {
    const newCategory = new Category({
      name,
      icon,
      user: userId,
      predefined: false,
    });

    await newCategory.save();

    return res.status(201).json({ error: false, category: newCategory });
  } catch {
    return res.status(500).json({ error: true, msg: "Error adding category" });
  }
};
