import mongoose, { Document, Schema } from "mongoose";

export interface IFixedExpense extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  category: mongoose.Types.ObjectId;
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

const FixedExpenseSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
  frequency: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (value: any) {
        return (
          (typeof value === "number" && value <= 36) || value === "unlimited"
        );
      },
      message: 'Frequency must be a number <= 36 or "unlimited"',
    },
  },
  timesCreated: { type: Number, default: 0 },
  recentCreatedDate: { type: Date, default: null },
  period: { type: String, enum: ["weekly", "monthly"], required: true },
  daysOfWeek: { type: [Number], min: 0, max: 6 },
  daysOfMonth: { type: [Number], min: 1, max: 31 },
  startDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFixedExpense>(
  "FixedExpense",
  FixedExpenseSchema
);
