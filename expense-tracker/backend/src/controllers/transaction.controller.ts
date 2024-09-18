import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import { IUser } from "../models/user.model";
import { updateBudgetTotal } from "../utils/totalMadeOnBudget";
const { matchedData } = require("express-validator");

export const getAllTransaction = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const {
    startDate,
    endDate,
    category,
    minAmount,
    maxAmount,
    page = 1,
    limit = 10,
    type,
    groupByDate,
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

  if (type) {
    query.type = type;
  }

  try {
    let transactions;
    if (groupByDate) {
      const groupFormat = groupByDate === "month" ? "%Y-%m" : "%Y-%m-%d";
      transactions = await Transaction.aggregate([
        { $match: query },
        {
          $group: {
            _id: { $dateToString: { format: groupFormat, date: "$date" } },
            transactions: { $push: "$$ROOT" },
          },
        },
        { $sort: { _id: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]);
    } else {
      transactions = await Transaction.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ date: -1 });
    }

    return res.status(200).json({ error: false, transactions });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error fetching transactions" });
  }
};

export const addNewTransaction = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { amount, type, description, category, date } = data;

  try {
    const newTransaction = new Transaction({
      user: userId,
      amount,
      type,
      description,
      category,
      date,
    });

    await newTransaction.save();

    await updateBudgetTotal(category);

    return res.status(201).json({ error: false, transaction: newTransaction });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error adding transaction" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const data = matchedData(req);
  const { amount, description, category, date, transactionId, type } = data;

  if (!(amount || description || category || date)) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, user: userId },
      { amount, description, category, date, type },
      { new: true }
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ error: true, msg: "Transaction not found" });
    }

    if (category) {
      if (category !== transaction.category.toString()) {
        await updateBudgetTotal(category);
        await updateBudgetTotal(transaction.category.toString());
      }
    } else {
      await updateBudgetTotal(transaction.category.toString());
    }

    return res.status(200).json({ error: false, transaction });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error updating transaction" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const { transactionId } = matchedData(req);

  try {
    const deletedTran = await Transaction.findOneAndDelete({
      _id: transactionId,
      user: userId,
    });

    if (!deletedTran) {
      return res
        .status(404)
        .json({ error: true, msg: "Transaction not found" });
    }

    await updateBudgetTotal(deletedTran.category.toString());

    return res.status(200).json({ error: false, transaction: deletedTran });
  } catch {
    return res.status(500).json({ error: true, msg: "Error deleting expense" });
  }
};
