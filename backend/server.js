const express = require("express");
const app = express();

//Routes
const userRoute = require("./routes/userRoutes");

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(5000, PORT, console.log("Server Started on Port: ", PORT));
