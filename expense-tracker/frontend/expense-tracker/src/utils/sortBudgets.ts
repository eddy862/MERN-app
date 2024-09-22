import { IBudget } from "../types/budgets";

export const sortByAmount = (budgets: IBudget[], isAsc = true) => {
  return budgets.sort((a, b) => {
    if (isAsc) {
      return a.amount - b.amount;
    }
    return b.amount - a.amount;
  });
}

export const sortByCreatedAt = (budgets: IBudget[], isAsc = true) => {
  return budgets.sort((a, b) => {
    if (isAsc) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const sortByCompletedPercentage = (budgets: IBudget[], isAsc = true) => {
  return budgets.sort((a, b) => {
    const aPercentage = (a.totalMade / a.amount) * 100;
    const bPercentage = (b.totalMade / b.amount) * 100;

    if (isAsc) {
      return aPercentage - bPercentage;
    }
    return bPercentage - aPercentage;
  });
}