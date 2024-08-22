import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import Budget from "../models/budget.model";
const { matchedData } = require("express-validator");

export const getAllBudgets = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const budgets = await Budget.find({ user: userId });

    return res.status(200).json({ error: false, budgets });
  } catch {
    return res.status(500).json({ error: true, msg: "Error getting budgets" });
  }
};

export const addBudget = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { amount, category, period } = data;

  try {
    const newBudget = new Budget({
      user: userId,
      amount,
      category,
      period,
    });

    await newBudget.save();

    return res.status(201).json({ error: false, budget: newBudget });
  } catch {
    return res.status(500).json({ error: true, msg: "Error adding budget" });
  }
};

export const updateBudget = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { amount, category, period, budgetId } = data;

  if (!(amount || category | period | budgetId)) {
    return res.status(400).json({error: true, msg: "No changes provided"})
  }

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: budgetId, user: userId },
      { amount, category, period },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: true, msg: "Budget not found" });
    }

    return res.status(200).json({ error: false, budget: updatedBudget });
  } catch {
    return res.status(500).json({ error: true, msg: "Error updating budget" });
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const { budgetId } = matchedData(req);

  try {
    const deletedBudget = await Budget.findOneAndDelete({
      _id: budgetId,
      user: userId,
    });

    if (!deletedBudget) {
      return res.status(404).json({ error: true, msg: "Budget not found" });
    }

    return res.status(200).json({ error: false, budget: deletedBudget });
  } catch {
    return res.status(500).json({ error: true, msg: "Error deleting budget" });
  }
};
