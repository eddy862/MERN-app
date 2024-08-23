import dontev from "dotenv";
dontev.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import UserAuthRouter from "./routes/userAuth.route";
import ExpenseRouter from "./routes/expense.route";
import CategoryRouter from "./routes/category.route"
import BudgetRouter from "./routes/budget.route"
import FixedExpenseRouter from "./routes/fixedExpense.route"
import passport from "passport";
import configJwtPassport from "./config/strategies/jwt-strategy";
import connectDB from "./config/mongoose";
import { checkAuth } from "./middlewares/checkAuth";

const app = express();

connectDB();

require("./jobs/scheduleRecurringExpenses");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
configJwtPassport(passport);

app.use("/api/auth", UserAuthRouter);

//protected routes
app.use(checkAuth);

app.use("/api/expense", ExpenseRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/budget", BudgetRouter)
app.use("/api/fixedExpense", FixedExpenseRouter)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
