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
  startDate: Date;
  isActive: boolean;
  createdAt: Date;
}