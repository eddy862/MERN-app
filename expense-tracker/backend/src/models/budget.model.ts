import mongoose, { Document, Schema } from "mongoose";

interface IBudget extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId;
  period: "monthly" | "yearly";
  createdAt: Date;
  startDate: Date;
  endDate: Date;
}

const BudgetSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  period: { type: String, required: true, enum: ["monthly", "yearly"] },
  createdAt: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model<IBudget>("Budget", BudgetSchema);
