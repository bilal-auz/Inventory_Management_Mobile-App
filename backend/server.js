const { errorHandler, notFound } = require("./middlewares/errorHandlers");

const dotenv = require("dotenv");
dotenv.config();
require("express-async-errors");

//DB
const connect_db = require("./config/db");
connect_db();

//server
const express = require("express");
const app = express();
app.use(express.json()); //accept json data

//Routes
const userRoute = require("./routes/userRoutes");
const eggRoute = require("./routes/eggRoutes");
const priceRoute = require("./routes/priceRoutes");

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoute);
app.use("/api/egg", eggRoute);
app.use("/api/price", priceRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log("Server Started on Port: ", PORT));
