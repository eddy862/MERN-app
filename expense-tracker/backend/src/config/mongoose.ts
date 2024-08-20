import mongoose from "mongoose";
import { seedParentCategories } from "./seeds/seedParentCategories";
import { seedCategories } from "./seeds/seedCategories";

export default async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env");
  }
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await seedParentCategories();
    await seedCategories();
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
}
