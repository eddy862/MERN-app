import { Request, Response } from "express";
import { IUser } from "../models/user.model";
const { matchedData } = require("express-validator");
import FixedItem from "../models/fixedItem.model";
import { processFixedItems } from "../utils/fixedItem";

export const addFixedItem = async (req: Request, res: Response) => {
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
    type,
  } = data;

  if (period === "weekly" && (!daysOfWeek || daysOfWeek.length === 0)) {
    return res.status(400).json({
      error: true,
      msg: "Day of week is required for weekly expenses",
    });
  }

  if (period === "monthly" && (!daysOfMonth || daysOfMonth.length === 0)) {
    return res.status(400).json({
      error: true,
      msg: "Day of month is required for monthly expenses",
    });
  }

  try {
    const newFixedItem = new FixedItem({
      user: userId,
      amount,
      description,
      category,
      startDate,
      frequency,
      period,
      daysOfWeek,
      daysOfMonth,
      type,
    });

    await newFixedItem.save();

    await processFixedItems(userId as string);

    return res.status(201).json({ error: false, fixedItem: newFixedItem });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error adding fixed item" });
  }
};

export const getFixedItems = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const fixedItems = await FixedItem.find({ user: userId }).sort({
      isActive: -1,
      createdAt: -1,
    });

    return res.status(200).json({ error: false, fixedItems });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error fetching fixed items" });
  }
};

export const updateFixedItem = async (req: Request, res: Response) => {
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
    fixedItemId,
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
      isActive
    )
  ) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    const fixedItem = await FixedItem.findOne({
      _id: fixedItemId,
      user: userId,
    });

    if (!fixedItem) {
      return res.status(404).json({ error: true, msg: "Fixed item not found" });
    }

    if (period) {
      if (
        fixedItem.period === "monthly" &&
        period === "weekly" &&
        (!daysOfWeek || daysOfWeek.length === 0)
      ) {
        return res.status(400).json({
          error: true,
          msg: "Day of week is required for weekly transactions",
        });
      }

      if (
        fixedItem.period === "weekly" &&
        period === "monthly" &&
        (!daysOfMonth || daysOfMonth.length === 0)
      ) {
        return res.status(400).json({
          error: true,
          msg: "Day of month is required for monthly transactions",
        });
      }
    }

    fixedItem.amount = amount || fixedItem.amount;
    fixedItem.description = description || fixedItem.description;
    fixedItem.category = category || fixedItem.category;
    fixedItem.startDate = startDate || fixedItem.startDate;
    fixedItem.daysOfWeek = daysOfWeek || fixedItem.daysOfWeek;
    fixedItem.daysOfMonth = daysOfMonth || fixedItem.daysOfMonth;

    // Reset daysOfWeek or daysOfMonth if the period is changed
    if (period) {
      if (fixedItem.period === "monthly" && period === "weekly") {
        fixedItem.daysOfMonth = [];
      }

      if (fixedItem.period === "weekly" && period === "monthly") {
        fixedItem.daysOfWeek = [];
      }
    }

    fixedItem.period = period || fixedItem.period;

    //ensure daysofweek or daysOfMonth is not empty
    if (
      fixedItem.period === "weekly" &&
      fixedItem.daysOfWeek &&
      fixedItem.daysOfWeek.length === 0
    ) {
      return res.status(400).json({
        error: true,
        msg: "Day of week is required for weekly transactions",
      });
    }

    if (
      fixedItem.period === "monthly" &&
      fixedItem.daysOfMonth &&
      fixedItem.daysOfMonth.length === 0
    ) {
      return res.status(400).json({
        error: true,
        msg: "Day of month is required for monthly transactions",
      });
    }

    // Ensure daysOfWeek or daysOfMonth is not provided if the period is opposite
    if (fixedItem.period === "weekly" && daysOfMonth) {
      return res.status(400).json({
        error: true,
        msg: "The period is weekly, days of month should not be provided",
      });
    }

    if (fixedItem.period === "monthly" && daysOfWeek) {
      return res.status(400).json({
        error: true,
        msg: "The period is monthly, days of week should not be provided",
      });
    }

    if (frequency && frequency !== "unlimited") {
      // Check if the frequency is lower than the timesCreated
      if (frequency < fixedItem.timesCreated) {
        return res.status(400).json({
          error: true,
          msg: "The number of frequency should not lower than the number of this transaction created",
        });
      }

      // Deactivate fixed expense if the frequency is reached
      if (frequency === fixedItem.timesCreated) {
        fixedItem.isActive = false;
      }
    }

    // Reset timesCreated if the frequency is changed to unlimited or vice versa
    if (
      (fixedItem.frequency === "unlimited" && frequency !== "unlimited") ||
      (fixedItem.frequency !== "unlimited" && frequency === "unlimited")
    ) {
      fixedItem.timesCreated = 0;
    }

    // Reset timesCreated if the fixed expense is not active and the frequency is reached
    if (
      isActive &&
      !fixedItem.isActive &&
      fixedItem.timesCreated === fixedItem.frequency
    ) {
      fixedItem.timesCreated = 0;
    }

    fixedItem.frequency = frequency || fixedItem.frequency;
    fixedItem.isActive = isActive || fixedItem.isActive;

    await fixedItem.save();

    return res.status(200).json({ error: false, fixedItem });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error updating fixed item" });
  }
};

export const deleteFixedItem = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  const { fixedItemId } = matchedData(req);

  try {
    const fixedItem = await FixedItem.findOneAndDelete({
      _id: fixedItemId,
      user: userId,
    });

    if (!fixedItem) {
      return res
        .status(404)
        .json({ error: true, msg: "Fixed expense not found" });
    }

    return res.status(200).json({ error: false, fixedItem });
  } catch {
    return res
      .status(500)
      .json({ error: true, msg: "Error deleting fixed expense" });
  }
};
