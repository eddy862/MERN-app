import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import Budget from "../models/budget.model";
const { matchedData } = require("express-validator");

export const getAllBudgets = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const { category, period, startDate, endDate } = matchedData(req);

  if (startDate && !endDate) {
    return res.status(400).json({
      error: true,
      msg: "End date is required when start date is provided",
    });
  }

  if (endDate && !startDate) {
    return res.status(400).json({
      error: true,
      msg: "Start date is required when end date is provided",
    });
  }

  if (startDate && endDate && startDate > endDate) {
    return res.status(400).json({
      error: true,
      msg: "Start date must be before end date",
    });
  }

  const query: any = { user: userId };

  if (category) {
    query.category = category;
  }

  if (period) {
    query.period = period;
  }

  if (startDate) {
    query.startDate = { $gte: new Date(startDate as string) };
  }

  if (endDate) {
    query.endDate = { $lte: new Date(endDate as string) };
  }

  try {
    const budgets = await Budget.find(query);

    return res.status(200).json({ error: false, budgets });
  } catch {
    return res.status(500).json({ error: true, msg: "Error getting budgets" });
  }
};

export const addBudget = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { amount, category, period, startDate, endDate } = data;

  try {
    const newBudget = new Budget({
      user: userId,
      amount,
      category,
      period,
      startDate,
      endDate,
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
  const { amount, category, period, budgetId, startDate, endDate } = data;

  if (!(amount || category | period | budgetId)) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: budgetId, user: userId },
      { amount, category, period, startDate, endDate },
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
