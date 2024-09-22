export interface IBudget {
  _id: string;
  category: string;
  amount: number;
  period: "monthly" | "yearly" | "customised";
  startDate: string;
  endDate: string;
  totalMade: number;
  createdAt: string;
}

export interface IBudgetsFilter {
  category?: string;
  period?: "monthly" | "yearly" | "customised";
  startDate?: string;
  endDate?: string;
  categoryType?: "expense" | "income";
  page?: number;
  limit?: number;
  completed?: boolean;
}