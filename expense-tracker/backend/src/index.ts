import dontev from "dotenv";
dontev.config();

import express from "express";
import morgan from "morgan";
import UserAuthRouter from "./routes/userAuth.route";
import TransactionRouter from "./routes/transaction.route";
import CategoryRouter from "./routes/category.route";
import BudgetRouter from "./routes/budget.route";
import FixedExpenseRouter from "./routes/fixedItem.route";
import UserRouter from "./routes/user.route";
import ParentCategoryRouter from "./routes/parentCategory.route";
import passport from "passport";
import configJwtPassport from "./config/strategies/jwt-strategy";
import configGooglePassport from "./config/strategies/google-strategy";
import connectDB from "./config/mongoose";
import { checkAuth } from "./middlewares/checkAuth";
import cors from "cors";
import path from "path";

const app = express();

connectDB();

require("./jobs/scheduleRecurringTransactions");

app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));
app.use(express.json());

app.use(passport.initialize());
configJwtPassport(passport);
configGooglePassport(passport);

const distPath = path.resolve(__dirname, "../../frontend/expense-tracker/dist");

app.use(express.static(distPath));

app.use("/api/auth", UserAuthRouter);

//protected routes
app.use("/api/transactions", checkAuth, TransactionRouter);
app.use("/api/categories", checkAuth, CategoryRouter);
app.use("/api/budgets", checkAuth, BudgetRouter);
app.use("/api/fixedItems", checkAuth, FixedExpenseRouter);
app.use("/api/user", checkAuth, UserRouter);
app.use("/api/parentCategories", checkAuth, ParentCategoryRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
