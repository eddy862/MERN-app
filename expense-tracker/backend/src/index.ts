import dontev from "dotenv";
dontev.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import UserAuthRouter from "./routes/userAuth.route";
import passport from "passport";
import configJwtPassport from "./config/strategies/jwt-strategy";
import connectDB from "./config/mongoose";

const app = express();

connectDB();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
configJwtPassport(passport);

app.use("/api/auth", UserAuthRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
