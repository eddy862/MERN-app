import mongoose, { Document, Schema } from "mongoose";

interface IBudget extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId;
  period: "monthly" | "yearly" | "customised";
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  totalMade: number;
}

const BudgetSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  period: { type: String, required: true, enum: ["monthly", "yearly", "customised"] },
  createdAt: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalMade: { type: Number, default: 0 }
});

export default mongoose.model<IBudget>("Budget", BudgetSchema);