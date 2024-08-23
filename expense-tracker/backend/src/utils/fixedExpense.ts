import FixedExpense from "../models/fixedExpense.model";
import Expense from "../models/expense.model";

export const processFixedExpenses = async (userId?: string) => {
  const query: any = userId ? { user: userId, isActive: true } : { isActive: true };

  const fixedExpenses = await FixedExpense.find(query);
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayOfMonth = today.getDate();

  for (const fixedExpense of fixedExpenses) {
    const shouldProcessToday = 
      fixedExpense.recentCreatedDate === null || 
      !isSameDay(fixedExpense.recentCreatedDate, today);

    if (shouldProcessToday && new Date(fixedExpense.startDate) <= today) {
      const canCreateExpense = 
        fixedExpense.frequency === "unlimited" || 
        fixedExpense.timesCreated < fixedExpense.frequency;

      if (canCreateExpense) {
        const isWeeklyExpenseToday = 
          fixedExpense.period === "weekly" && 
          fixedExpense.daysOfWeek?.includes(dayOfWeek);

        const isMonthlyExpenseToday = 
          fixedExpense.period === "monthly" && 
          fixedExpense.daysOfMonth?.includes(dayOfMonth);

        if (isWeeklyExpenseToday || isMonthlyExpenseToday) {
          await createExpense(fixedExpense);
          fixedExpense.timesCreated++;
        }

        if (fixedExpense.timesCreated === fixedExpense.frequency) {
          fixedExpense.isActive = false;
        }
      }
    }
  }
};

const createExpense = async (fixedExpense: any) => {
  const newExpense = new Expense({
    user: fixedExpense.user,
    amount: fixedExpense.amount,
    description: fixedExpense.description,
    category: fixedExpense.category,
  });

  await newExpense.save();

  fixedExpense.recentCreatedDate = new Date();
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
