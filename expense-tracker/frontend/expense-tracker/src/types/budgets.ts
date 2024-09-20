export interface IBudget {
  _id: string;
  category: string;
  amount: number;
  period: "monthly" | "yearly" | "customised";
  startDate: string;
  endDate: string;
  totalMade: number;
}

export interface IBudgetsFilter {
  category?: string;
  period?: "monthly" | "yearly" | "customised";
  startDate?: string;
  endDate?: string;
}