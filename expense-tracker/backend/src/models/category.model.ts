import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  user?: Schema.Types.ObjectId;
  predefined: boolean;
  icon: string;
  parentCategory: Schema.Types.ObjectId;
  createdAt: Date;
}

const CategoryScehma: Schema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  predefined: { type: Boolean, rquired: true, default: false },
  icon: { type: String, required: true },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "ParentCategory",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICategory>("Category", CategoryScehma);
