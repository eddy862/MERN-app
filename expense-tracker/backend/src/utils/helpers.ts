import bcrypt from "bcrypt";
import Expense from "../models/expense.model";

export const hashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain: string, password: string) => {
  return await bcrypt.compare(plain, password);
};

export const generateRecurringExpenses = async (userId: string) => {
  const today = new Date();

  // Find all recurring expenses that have not ended
  const recurringExpenses = await Expense.find({
    user: userId,
    recurrenceInterval: { $ne: null },
    $or: [
      { recurrenceEndDate: { $gte: today } },
      { recurrenceEndDate: null }
    ]
  });

  recurringExpenses.forEach(async (expense) => {
    // Calculate the next date based on the recurrence interval
    let nextDate = new Date(expense.date);
    switch (expense.recurrenceInterval) {
      case "daily":
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    // If the next date is today or in the past, create a new expense
    if (nextDate <= today) {
      const newExpense = new Expense({
        user: expense.user,
        amount: expense.amount,
        description: expense.description,
        category: expense.category,
        date: nextDate,
        recurrenceInterval: expense.recurrenceInterval,
        recurrenceEndDate: expense.recurrenceEndDate,
      });

      await newExpense.save();
      expense.recurrenceInterval = null;
      await expense.save();
    }
  });
};
