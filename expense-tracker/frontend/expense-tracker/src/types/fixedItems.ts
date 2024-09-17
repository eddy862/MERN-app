export interface IFixedItem {
  _id: string;
  user: string;
  amount: number;
  description: string;
  type: "expense" | "income";
  category: string;
  frequency: number | "unlimited";
  timesCreated: number;
  recentCreatedDate: Date | null;
  period: "weekly" | "monthly";
  daysOfWeek?: number[] ; // 0 (Sunday) to 6 (Saturday)
  daysOfMonth?: number[]; // 1 to 31
  startDate: string;
  isActive: boolean;
  createdAt: Date;
}

export interface IUpdateFixedItemBody {
  amount?: number;
  description?: string;
  category?: string;
  startDate?: Date;
  frequency?: number | "unlimited";
  period?: "weekly" | "monthly";
  daysOfWeek?: number[];
  daysOfMonth?: number[];
  isActive?: boolean;
}