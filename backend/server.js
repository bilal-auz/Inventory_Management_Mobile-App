const dotenv = require("dotenv");
dotenv.config();

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

app.use("/api/user", userRoute);
app.use("/api/egg", eggRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server Started on Port: ", PORT));
