import mongoose, { Document, Schema } from "mongoose";

interface IBudget extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId;
  period: "monthly" | "yearly";
  createdAt: Date;
}

const BudgetSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  period: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBudget>("Budget", BudgetSchema);
