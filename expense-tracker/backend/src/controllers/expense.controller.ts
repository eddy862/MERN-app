import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { IUser } from "../models/user.model";
const {matchedData} = require("express-validator");

export const getAllExpenses = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const expenses = await Expense.find({ user: userId });
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
  const { amount, description, category, date } = data;

  try {
    const newExpense = new Expense({
      user: userId,
      amount,
      description,
      category,
      date,
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

  try {
    const expense = await Expense.findOne({ _id: expenseId, user: userId });

    if (!expense) {
      return res.status(404).json({ error: true, msg: "Expense not found" });
    }

    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    await expense.save();

    return res.status(200).json({ error: false, expense });
  } catch {
    return res.status(500).json({ error: true, msg: "Error updating expense" });
  }
}

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
}
