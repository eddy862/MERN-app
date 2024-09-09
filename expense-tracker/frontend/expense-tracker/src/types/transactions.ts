export interface ITransaction {
  _id: string;
  user: string;
  amount: number;
  type: "expense" | "income";
  description: string;
  category: string;
  date: string;
  createdAt: Date;
}

export interface ITransactionGroup {
  _id: string;
  transactions: ITransaction[];
}

export interface ITransactionFilter {
  startDate?: string;
  endDate?: string;
  category?: string;
  minAmount?: string;
  maxAmount?: string;
  page?: number;
  limit?: number;
  type?: "expense" | "income";
  groupByDate?: "month" | "day";
}