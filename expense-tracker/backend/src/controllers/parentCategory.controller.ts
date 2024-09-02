import { Request, Response } from "express";
import ParentCategory from "../models/parentCategory.model";
const { matchedData } = require("express-validator");

export const getParentCategories = async (req: Request, res: Response) => {
  const { type } = matchedData(req);

  try {
    const query = type ? { type } : {};
    const parentCategories = await ParentCategory.find(query);
    res.status(200).json({ error: false, parentCategories });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: true, msg: errorMessage });
  }
};
