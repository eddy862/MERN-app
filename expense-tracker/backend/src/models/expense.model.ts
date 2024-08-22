import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IExpense extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  description: string;
  category: Schema.Types.ObjectId;
  date: Date;
  createdAt: Date;
  recurrenceInterval?: "daily" | "weekly" | "monthly" | "yearly" | null;
  recurrenceEndDate?: Date | null;
}

const ExpenseSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: "" },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  recurrenceInterval: {type: String, enum: ["daily", "weekly", "monthly", "yearly"], default: null},
  recurrenceEndDate: {type: Date, default: null},
});

ExpenseSchema.plugin(mongoosePaginate)

export default mongoose.model<IExpense, mongoose.PaginateModel<IExpense>>("Expense", ExpenseSchema, "expenses");
