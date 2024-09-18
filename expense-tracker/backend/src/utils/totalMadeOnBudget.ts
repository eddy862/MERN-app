import Category from '../models/category.model';
import Budget from '../models/budget.model';
import Transaction from '../models/transaction.model'

export const updateBudgetTotal = async (categoryId: string) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    return;
  }

  const budgets = await Budget.find({ category: category._id });

  for (const budget of budgets) {
    const transactions = await Transaction.find({
      category: category._id,
      user: budget.user,
      date: { $gte: budget.startDate, $lte: budget.endDate },
    });

    const totalMade = transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);

    await Budget.findByIdAndUpdate(budget._id, { totalMade });
  }
}