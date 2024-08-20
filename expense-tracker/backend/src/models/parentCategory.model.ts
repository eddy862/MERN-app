import mongoose, { Document, Schema } from "mongoose";

export interface IParentCategory extends Document {
  name: string;
  color: string;
  createdAt: Date;
}

const ParentCategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, requied: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IParentCategory>(
  "ParentCategory",
  ParentCategorySchema
);
