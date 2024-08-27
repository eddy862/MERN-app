import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface ITransaction extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  type: "expense" | "income";
  description: string;
  category: Schema.Types.ObjectId;
  date: Date;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["expense", "income"], required: true },
  description: { type: String, default: "" },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

TransactionSchema.plugin(mongoosePaginate)

export default mongoose.model<ITransaction, mongoose.PaginateModel<ITransaction>>("Transaction", TransactionSchema, "transactions");
