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
import passport from "passport";
import configJwtPassport from "./config/strategies/jwt-strategy";
import configGooglePassport from "./config/strategies/google-strategy";
import connectDB from "./config/mongoose";
import { checkAuth } from "./middlewares/checkAuth";
import cors from "cors";

const app = express();

connectDB();

require("./jobs/scheduleRecurringTransactions");

app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));
app.use(express.json());

app.use(passport.initialize());
configJwtPassport(passport);
configGooglePassport(passport);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", UserAuthRouter);

//protected routes
app.use(checkAuth);

app.use("/api/transaction", TransactionRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/budget", BudgetRouter);
app.use("/api/fixedItem", FixedExpenseRouter);
app.use("/api/user", UserRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
