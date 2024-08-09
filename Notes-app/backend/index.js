require("dotenv").config();

//connect db
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect database: ", err));

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 8000;

const authRoutes = require("./routes/auth.route");
const noteRoutes = require("./routes/note.route");
const userRoutes = require("./routes/user.route");

app.use(morgan("tiny"));

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/notes", noteRoutes);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
