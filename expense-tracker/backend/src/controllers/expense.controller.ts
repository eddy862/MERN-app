import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { IUser } from "../models/user.model";
const { matchedData } = require("express-validator");

export const getAllExpenses = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const {
    startDate,
    endDate,
    category,
    minAmount,
    maxAmount,
    page = 1,
    limit = 10,
  } = data;

  const userId = (req.user as IUser)._id;

  const query: any = { user: userId };

  if (startDate) {
    query.date = { ...query.date, $gte: new Date(startDate as string) };
  }

  if (endDate) {
    query.date = { ...query.date, $lte: new Date(endDate as string) };
  }

  if (category) {
    query.category = category;
  }

  if (minAmount) {
    query.amount = { ...query.amount, $gte: parseFloat(minAmount as string) };
  }

  if (maxAmount) {
    query.amount = { ...query.amount, $lte: parseFloat(maxAmount as string) };
  }

  const options = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
    sort: { date: -1 },
  };

  try {
    const expenses = await Expense.paginate(query, options);
    return res.status(200).json({ error: false, expenses });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error fetching expenses" });
  }
};

export const addNewExpense = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const {
    amount,
    description,
    category,
    date,
    recurrenceInterval,
    recurrenceEndDate,
  } = data;

  if (!recurrenceInterval && recurrenceEndDate) {
    return res.status(400).json({
      error: true,
      msg: "Recurrence interval is required if end date is provided",
    });
  }

  try {
    const newExpense = new Expense({
      user: userId,
      amount,
      description,
      category,
      date,
      recurrenceInterval,
      recurrenceEndDate,
    });

    await newExpense.save();

    return res.status(201).json({ error: false, expense: newExpense });
  } catch {
    return res.status(500).json({ error: true, msg: "Error adding expense" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { amount, description, category, date, expenseId } = data;

  if (!(amount || description || category || date)) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      { amount, description, category, date },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: true, msg: "Expense not found" });
    }

    return res.status(200).json({ error: false, expense });
  } catch {
    return res.status(500).json({ error: true, msg: "Error updating expense" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const { expenseId } = matchedData(req);

  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: userId,
    });

    if (!deletedExpense) {
      return res.status(404).json({ error: true, msg: "Expense not found" });
    }

    return res.status(200).json({ error: false, expense: deletedExpense });
  } catch {
    return res.status(500).json({ error: true, msg: "Error deleting expense" });
  }
};
