import mongoose, { Document, Schema } from "mongoose";

export interface IParentCategory extends Document {
  name: string;
  type: "income" | "expense";
  createdAt: Date;
}

const ParentCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["income", "expense"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IParentCategory>(
  "ParentCategory",
  ParentCategorySchema
);
