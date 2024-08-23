import { Request, Response } from "express";
import { IUser } from "../models/user.model";
const { matchedData } = require("express-validator");
import FixedExpense from "../models/fixedExpense.model";
import { processFixedExpenses } from "../utils/fixedExpense";

export const addFixedExpense = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const userId = (req.user as IUser)._id;
  const {
    amount,
    description,
    category,
    startDate,
    frequency,
    period,
    daysOfWeek,
    daysOfMonth,
  } = data;

  try {
    const newFixedExpense = new FixedExpense({
      user: userId,
      amount,
      description,
      category,
      startDate,
      frequency,
      period,
      daysOfWeek,
      daysOfMonth,
    });

    await newFixedExpense.save();

    await processFixedExpenses(userId as string);

    return res
      .status(201)
      .json({ error: false, fixedExpense: newFixedExpense });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error adding fixed expense" });
  }
};

export const getFixedExpenses = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const fixedExpenses = await FixedExpense.find({ user: userId }).sort({
      isActive: -1,
      createdAt: -1,
    });

    return res.status(200).json({ error: false, fixedExpenses });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error fetching fixed expenses" });
  }
};

export const updateFixedExpense = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const {
    amount,
    description,
    category,
    startDate,
    frequency,
    period,
    daysOfWeek,
    daysOfMonth,
    isActive,
    timesCreated,
    fixedExpenseId
  } = data;

  if (
    !(
      amount ||
      description ||
      category ||
      startDate ||
      frequency ||
      period ||
      daysOfWeek ||
      daysOfMonth ||
      isActive ||
      timesCreated
    )
  ) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    const fixedExpense = await FixedExpense.findOne({
      _id: fixedExpenseId,
      user: userId,
    });

    if (!fixedExpense) {
      return res
        .status(404)
        .json({ error: true, msg: "Fixed expense not found" });
    }

    if (period) {
      if (
        fixedExpense.period === "monthly" &&
        period === "weekly" &&
        (!daysOfWeek || daysOfWeek.length === 0)
      ) {
        return res
          .status(400)
          .json({
            error: true,
            msg: "Day of week is required for weekly expenses",
          });
      }

      if (
        fixedExpense.period === "weekly" &&
        period === "monthly" &&
        (!daysOfMonth || daysOfMonth.length === 0)
      ) {
        return res
          .status(400)
          .json({
            error: true,
            msg: "Day of month is required for monthly expenses",
          });
      }
    }

    fixedExpense.amount = amount || fixedExpense.amount;
    fixedExpense.description = description || fixedExpense.description;
    fixedExpense.category = category || fixedExpense.category;
    fixedExpense.startDate = startDate || fixedExpense.startDate;
    fixedExpense.frequency = frequency || fixedExpense.frequency;
    fixedExpense.period = period || fixedExpense.period;
    fixedExpense.daysOfWeek = daysOfWeek || fixedExpense.daysOfWeek;
    fixedExpense.daysOfMonth = daysOfMonth || fixedExpense.daysOfMonth;
    fixedExpense.isActive = isActive || fixedExpense.isActive;
    fixedExpense.timesCreated = timesCreated || fixedExpense.timesCreated;

    if (frequency) {
      if (frequency < fixedExpense.timesCreated) {
        return res.status(400).json({error: true, msg: "The number of frequency should not lower than the number of this expense created"})
      }

      if (frequency === fixedExpense.timesCreated) {
        fixedExpense.isActive = false;
      }
    }

    // Reset timesCreated if the fixed expense is not active
    if (isActive && !fixedExpense.isActive && fixedExpense.timesCreated === fixedExpense.frequency) {
      fixedExpense.timesCreated = 0;
    }

    await fixedExpense.save();

    return res.status(200).json({ error: false, fixedExpense });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error updating fixed expense" });
  }
};

export const deleteFixedExpense = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const { fixedExpenseId } = matchedData(req);

  try {
    const fixedExpense = await FixedExpense.findOneAndDelete({
      _id: fixedExpenseId,
      user: userId,
    });

    if (!fixedExpense) {
      return res
        .status(404)
        .json({ error: true, msg: "Fixed expense not found" });
    }

    return res.status(200).json({ error: false, fixedExpense });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error deleting fixed expense" });
  }
};
